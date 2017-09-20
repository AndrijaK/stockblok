import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Workers from './Workers';
import ViewWorkerPDF from '../../ui/pages/ViewWorkerPDF/ViewWorkerPDF';
import rateLimit from '../../modules/rate-limit';
import { generateComponentAsPDF } from '../../modules/server/generate-pdf.js';

Meteor.methods({
  'workers.insert': function workersInsert(worker) {
    check(worker, {
      workerName: String,
      workerLastname: String,
      workerPosition: String,
    });

    try {
      return Workers.insert({ owner: this.userId, ...worker });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'workers.update': function workersUpdate(worker) {
    check(worker, {
      _id: String,
      workerName: String,
      workerLastname: String,
      workerPosition: String,
    });

    try {
      const workerId = worker._id;
      Workers.update(workerId, { $set: worker });
      return workerId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'workers.remove': function workersRemove(workerId) {
    check(workerId, String);

    try {
      return Workers.remove(workerId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },

  'workers.generatePDFSingle': function workersGeneratePDFSingle(workerId) {

    check(workerId, {
      workerId: String,

    });

    const worker = Workers.findOne({ _id: workerId.workerId });
    const fileName = `worker_${worker._id}.pdf`;
    return generateComponentAsPDF({ component: ViewWorkerPDF, props: { worker }, fileName })
    .then((result) => result)
    .catch((error) => { throw new Meteor.Error('500', error); });

  },


});

rateLimit({
  methods: [
    'workers.insert',
    'workers.update',
    'workers.remove',
    'workers.generatePDFSingle',
  ],
  limit: 5,
  timeRange: 1000,
});
