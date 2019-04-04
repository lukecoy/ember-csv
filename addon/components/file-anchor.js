import Component from '@ember/component';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { isArray } from '@ember/array';

export default Component.extend({
  tagName: 'a',

  attributeBindings: ['href', 'download'],

  fileName: 'download',

  didReceiveAttrs() {
    this._super(...arguments);

    assert(`data field must be defined as an array. You provided: ${this.get('data')}`,
      isArray(this.get('data'))
    );
  },

  init() {
    this._super(...arguments);

    if (window) {
      const downloadName = this.set('download', `${this.get('fileName')}.csv`);
      const reducedString = this.get('data').reduce(
        (csvString, csvRow) => `${csvString}${csvRow.join()}\n`, ''
      ).trim();

      const blob = new Blob([reducedString], { type: 'text/csv', endings: 'native' });

      if (get(window, 'navigator.msSaveOrOpenBlob')) {
        // Use msSaveOrOpenBlob if it exists because MSFT browsers
        // don't support Data URI's in the anchor href
        this.set('click', () => {
          window.navigator.msSaveOrOpenBlob(blob, downloadName);
        });
      } else {
        // Else, attach the Data URI for all other modern browsers
        this.set('href', URL.createObjectURL(blob));
      }
    }
  }
});
