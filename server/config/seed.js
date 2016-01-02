/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';

Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'item1',
      info: 'Item1 description'
    }, {
      name: 'item2',
      info: 'Item description 2'
    });
  });

