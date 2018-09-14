csv-anchor
==============================================================================

This addon provides a simple component for generating csv download URLs from 2D arrays

So, doing this:

```handlebars
{{component "csv-anchor@download-url" csvData=csvData}}
```

...would yield something like this:

```html
<a href="<data-uri-generated-here>">
  Download CSV file
</a>
```

...and opening the file downloaded from that anchor would yield this:

```csv
First Name,Last Name
Foo,Bar
```

Installation
------------------------------------------------------------------------------

```
ember install csv-anchor
```

Usage
------------------------------------------------------------------------------

The download-url component simply takes in 1 property, csvData:

```handlebars
{{component "csv-anchor@download-url" csvData=csvData}}
```

csvData is expected to be a 2D array of strings, representing the rows of data. See the headline section for more information.

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd csv-anchor`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
