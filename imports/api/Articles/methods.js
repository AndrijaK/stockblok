import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Articles from './Articles';
import ViewArticlePDF from '../../ui/pages/ViewArticlePDF/ViewArticlePDF';
import rateLimit from '../../modules/rate-limit';
import { ViewArticle } from '../../ui/pages/ViewArticle/ViewArticle';

import { generateComponentAsPDF } from '../../modules/server/generate-pdf.js';

Meteor.methods({
  'articles.insert': function articlesInsert(article) {
    check(article, {
      articleName: String,
      articleDescription: String,
      articleStandard: String,
      articleHeatNumber: String,
      articleQuantity: Number,
      articlePrice: Number,
      articleTotalValue: Number,
      articleQRcode: String,
      articleInvoiceId: String,
      articleCodeId: String,
    });

    try {
      return Articles.insert({ owner: this.userId, ...article });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'articles.update': function articlesUpdate(article) {
    check(article, {
      _id: String,
      articleName: String,
      articleDescription: String,
      articleStandard: String,
      articleHeatNumber: String,
      articleQuantity: Number,
      articlePrice: Number,
      articleTotalValue: Number,
      articleQRcode: String,
      articleInvoiceId: String,
      articleCodeId: String,
    });

    try {
      const articleId = article._id;
      Articles.update(articleId, { $set: article });
      return articleId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'articles.remove': function articlesRemove(articleId) {
    check(articleId, String);

    try {
      return Articles.remove(articleId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'articles.generatePDFSingle': function articlesGeneratePDFSingle(articleId) {

    check(articleId, {
      articleId: String,

    });

    const article = Articles.findOne({ _id: articleId.articleId });
    const fileName = `article_${article._id}.pdf`;
    return generateComponentAsPDF({ component: ViewArticlePDF, props: { article }, fileName })
    .then((result) => result)
    .catch((error) => { throw new Meteor.Error('500', error); });

  },

});

rateLimit({
  methods: [
    'articles.insert',
    'articles.update',
    'articles.remove',
    'articles.generatePDFSingle',
  ],
  limit: 5,
  timeRange: 1000,
});
