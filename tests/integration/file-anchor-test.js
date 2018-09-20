import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import sinon from 'sinon';

moduleForComponent('ember-csv@file-anchor', 'Integration | Component | file-anchor', {
  integration: true,

  beforeEach() {
    this.sandbox = sinon.sandbox.create();

    this.set('data', [
      ['First Name', 'Last Name'],
      ['Foo', 'Bar']
    ]);
  },

  afterEach() {
    this.sandbox.restore();
  }
});

test('it renders correctly when utilizing data URI', function(assert) {
  set(window, 'navigator.msSaveOrOpenBlob', null);

  this.render(hbs`{{component "ember-csv@file-anchor" data=data}}`);

  assert.equal(find('a').getAttribute('href'),
    'data:text/csv;charset=utf-8;base64,Rmlyc3QgTmFtZSxMYXN0IE5hbWUKRm9vLEJhcg==',
    'The anchors href is correctly rendered when using Data URI'
  );

  assert.equal(find('a').getAttribute('download'),
    `download.csv`,
    'The anchors default download attribute is correctly rendered'
  );
});

test('it renders correctly when utilizing msSaveOrOpenBlob', async function(assert) {
  set(window, 'navigator.msSaveOrOpenBlob', this.sandbox.stub());

  this.render(hbs`{{component "ember-csv@file-anchor" data=data}}`);

  await click('a');

  const reducedString = this.get('data').reduce(
    (csvString, csvRow) => `${csvString}${csvRow.join()}\n`, ''
  ).trim();
  const expectedBlob = new Blob([reducedString], { type: 'text/csv', endings: 'native' });

  assert.ok(window.navigator.msSaveOrOpenBlob.calledWithExactly(expectedBlob, 'download.csv'),
    'msSaveOrOpenBlob is called with the correct arguments'
  );
});

test('it renders correctly when fileName arg is overriden', async function(assert) {
  set(window, 'navigator.msSaveOrOpenBlob', this.sandbox.stub());
  const fileName = this.set('fileName', 'foobar');

  this.render(hbs`{{component "ember-csv@file-anchor" data=data fileName=fileName}}`);

  assert.equal(find('a').getAttribute('download'),
    `${fileName}.csv`,
    'The anchors download attribute is correctly rendered'
  );

  await click('a');

  const reducedString = this.get('data').reduce(
    (csvString, csvRow) => `${csvString}${csvRow.join()}\n`, ''
  ).trim();
  const expectedBlob = new Blob([reducedString], { type: 'text/csv', endings: 'native' });

  assert.ok(window.navigator.msSaveOrOpenBlob.calledWithExactly(expectedBlob, `${fileName}.csv`),
    'msSaveOrOpenBlob is called with the correct arguments & overrode fileName arg'
  );
})
