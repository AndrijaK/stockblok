import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Storages from './Storages';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'storages.insert': function storagesInsert(storage) {
    check(storage, {
      storageName: String,
      storageAbbrevation: String,
      storageState: String,
      storageAddress: String,
      storageContactPhone: String,
      storageContactEmail: String,
      storageManager: String,
      storageArticles:Array
    });

    try {
      return Storages.insert({ owner: this.userId, ...storage });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'storages.update': function storagesUpdate(storage) {
    check(storage, {
      _id: String,
      storageName: String,
      storageAbbrevation: String,
      storageState: String,
      storageAddress: String,
      storageContactPhone: String,
      storageContactEmail: String,
      storageManager: String,
      storageArticles:Array
    });

    try {
      const storageId = storage._id;
      Storages.update(storageId, { $set:
       {
         storageName: storage.storageName,
         storageAbbrevation: storage.storageAbbrevation,
         storageState: storage.storageState,
         storageAddress: storage.storageAddress,
         storageContactPhone: storage.storageContactPhone,
         storageContactEmail: storage.storageContactEmail,
         storageManager: storage.storageManager,
       }
       });
      return storageId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'storages.remove': function storagesRemove(storageId) {
    check(storageId, String);

    try {
      return Storages.remove(storageId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'storages.updateStorageArticle': function updateStorageArticle(storageArticle) {


    check(storageArticle, {
      storageId:String,
      articleId:String,
      articleName:String,
      articleDescription:String,
      articleStandard:String,
      articleHeatNumber:String,
      articleQuantity:Number,
      articlePrice:Number,
    });

    try {
      const storageId = storageArticle.storageId;
      let flag = 0;
      Storages.find({}, {fields: {'storageArticles':1,'_id':0}}).map(function(item)
      {

                item.storageArticles.map(function(article)
                {
                   if(article.articleId == storageArticle.articleId )
                   {
                     flag++;
                   }
                });
      });


      if(flag==0)
      {
        Storages.update(storageId, { $push: {"storageArticles": storageArticle } });
        return true;
      }
      else {
        return false;
      }


    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }

  },




});

rateLimit({
  methods: [
    'storages.insert',
    'storages.update',
    'storages.remove',
    'storages.updateStorageArticle'
  ],
  limit: 5,
  timeRange: 1000,
});
