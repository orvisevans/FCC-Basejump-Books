/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Book = require('../api/book/book.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Book.find({}).remove(function() {
  var userId = User.find({name: 'Test User'})._id || 'nobody';
  Book.create({
    name: 'Name of the Wind',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://books.google.com/books/content?id=TG5DXNXv2tAC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70ASYCNIToKL1VBzzJ6b3gDjJRbMZs_obPe3advQCZvK3Bp01GqP0hi1VmUTKhmnMEPchreXE9SEWKhwI7RdkTJpMvA-U037FI-iSy4BC38duY5F9IaIhpVQvEk4ZFpWyI-L2XA',
    owner: userId
  }, {
    name: 'Wise Man\'s Fear',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://books.google.com/books/content?id=NaxKSwAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72VjsYEkt7qna5htvcTfQssJFZvL2RRxsLSgmOd0u6bBM-CcrzwQSKxEkr1Nm76nmNcKpKvfOSZ3sxle6Aslfd9OgM9jIA92QDZFUKZ4Lyt5RVQrdDsL-in3-9-gLUxRDAr-TDY',
    owner: userId
  }, {
    name: '1984',
    author: 'George Orwell',
    coverUrl: 'https://books.google.com/books/content?id=FTHnGZeroUoC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70ZVNeb7hPP2UQglMuIqFGXiJBptjjR_HeOdYCl3MXwbzShVs3PG0IG8UDt-o0TH2G3kJ2kVOsOFZUg0TLi7Mi2IwkTLcvl_Wfd048WLMGinEe0r7575kMQriULgGEwJz7466gH',
    owner: userId
  }, {
    name: 'Animal Farm',
    author: 'George Orwell',
    coverUrl: 'https://books.google.com/books/content?id=nkalO3OsoeMC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72ayU66fmlXUz_ZziQYetBiCBsfTZU-G8rJRzNwmuj5AQIzFOkhysR7LeGXC146assHE0JYU4dnUQ0xiyAHeX36FhxjAbgFP9_tmfzxkcg3QiW0YBlt56oBOzBNSDp5psfndCsW',
    owner: userId
  }, {
    name: 'Eloquent Javascript',
    author: 'Marijn Haverbeke',
    coverUrl: 'https://books.google.com/books/content?id=mDzDBQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71ENb2JIUF6J57oKTHs-fXoqEBQmNw9iPajnG8lJPgcqak9ckbxlfG6BSmKJkW8U8lQBneanBxwXwK49ehfxKLGTzktN-YO--Eru-3LqyLD9UZu2XxBKZ6FY-XGZ0z5EsVQuxJF',
    owner: userId
  }, {
    name: 'Outliers',
    author: 'Malcolm Gladwell',
    coverUrl: 'https://books.google.com/books/content?id=dQgNBQAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73Msz7oG5Uw0SpFrKLfaWuy8JHIqcEBZwtWktX6weHlHqrHsAHiPEPps4hJAM5YF5veZ8i4YeVAO711B4CldhqwsTkc64mCEobLVTI8TBcRgMXNkZemVopOC2r-gfN9DzWpIodr',
    owner: userId
  }, {
    name: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J K Rowling',
    coverUrl: 'https://books.google.com/books/content?id=hACTuAAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73sbuBMgImygDBcB3xaRkUgtstlucmiPJDtjnNZ4FHxjmSlLlhoqXJ_jfOGYlVNyW-zlyyEfs2RvnSiF8zLNNeZLCd5bTUtF1zRsESZUnph2zXLMZN5XdzGQRAP7MZQVHeMjAty',
    owner: userId
  }, {
    name: 'The Martian',
    author: 'Andy Weir',
    coverUrl: 'https://books.google.com/books/content?id=53pOCgAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71dGuELUCPYjbSLhC-AR_hUH-QmPJ7Psn_oYF9uGl_6t7Tw_6hY_2h7d2lBOFYJmVcfzmGraJd2QH2plhOC9N7PJakMVQ6rI-ceg0Ppf9hutFrBlkimSgbz_cKpMmfdCm6OqM80',
    owner: userId
  }, {
    name: 'Freakonomics',
    author: 'Steven Levitt and Steven Dubner',
    coverUrl: 'https://books.google.com/books/content?id=wNPnl5zYA-cC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70XagAmYBino5NGV_8E0C7hqHr0GhPgJwl-dIp6Fh9ZSthZDi35hthE9G9ma14UhLbA2W6QPZTgl7dkeJxQf67Nlxzpymvd5t3bCvKNnKBqsQrwmTMVnjr8qVeOEyW2zwiF07ln',
    owner: userId
  }, function() {
      console.log('finished populating books');
    }
  );
})
