import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Articles from '../Articles';

Meteor.publish('articles', function articles() {
  return Articles.find({ owner: this.userId });
});

Meteor.publish('articles.view', function articlesView(articleId) {
  check(articleId, String);
  return Articles.find({ _id: articleId, owner: this.userId });
});
