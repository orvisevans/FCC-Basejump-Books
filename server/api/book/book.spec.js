/*jshint mocha:true*/

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/books', function() {

  before(function(done) {
    require('../../config/seed');
    setTimeout(function() {
      done();
    }, 1500);
  });

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with 9 public books', function(done) {
    request(app)
      .get('/api/books')
      .end(function(err, res) {
        if (err) return done(err);
        res.body.length.should.be.exactly(8);
        done();
      })
  });

  it('should attach owner names to books', function(done) {
    request(app)
      .get('/api/books')
      .end(function(err, res) {
        if (err) return done(err);
        res.body.forEach(function(book) {
          (book.owner.name === undefined).should.eql(false);
        });
        done();
      });
  });
});

describe('GET /api/books/:id', function() {
  var testBook;

  before(function(done) {
    request(app)
      .get('/api/books')
      .end(function(err, res) {
        if (err) return done(err);
        testBook = res.body[0];
        done();
      });
  });

  it('should return JSON Object', function(done) {
    request(app)
      .get('/api/books/' + testBook._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        done();
      });
  });

  it('should return a book with at least author, coverUrl, dateAdded, and owner', function(done) {
    request(app)
      .get('/api/books/' + testBook._id)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('author');
        res.body.should.have.property('coverUrl');
        res.body.should.have.property('dateAdded');
        res.body.should.have.property('owner');
        done();
      });
  });
});
