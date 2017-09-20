import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { createContainer } from 'meteor/react-meteor-data';

import InvoicesCollection from '../../../api/Invoices/Invoices';
import CodesCollection from '../../../api/CodeLists/CodeLists';

const Chance = require('chance');
const chance = new Chance();

class ArticleEditor extends React.Component {

  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        articleName: {
          required: true,
        },
        articleDescription: {
          required: true,
        },
        articleStandard: {
          required: false,
        },
        articleHeatNumber: {
          required: false,
        },
        articleQuantity: {
          required: true,
        },
        articlePrice: {
          required: true,
        },
        articleCodeId: {
          required: true,
        },

      },
      messages: {
        articleName: {
          required: 'Article name is required!',
        },
        articleDescription: {
          required: 'Article description is required!',
        },
        articleStandard: {
          required: 'Article standard is not required.',
        },
        articleHeatNumber: {
          required: 'Article heat number is not required.',
        },
        articleQuantity: {
          required: 'Article quantity is required.',
        },
        articlePrice: {
          required: 'Article price is required.',
        },
        articleCodeId: {
          required: "Article code Id is required.",
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }



  handleSubmit() {;
    const { history } = this.props;
    const existingArticle = this.props.article && this.props.article._id;
    const methodToCall = existingArticle ? 'articles.update' : 'articles.insert';
    function totalValue(qnt,price)
    {
      return qnt*price;
    }

    const article = {
      articleName: this.articleName.value.trim(),
      articleDescription: ReactDOM.findDOMNode(this.articleDescription).value.trim(),
      articleStandard: this.articleStandard.value.trim(),
      articleHeatNumber: this.articleHeatNumber.value.trim(),
      articleQuantity: this.articleQuantity.valueAsNumber,
      articlePrice: this.articlePrice.valueAsNumber,
      articleTotalValue: totalValue(this.articleQuantity.valueAsNumber,this.articlePrice.valueAsNumber),
      articleQRcode: chance.guid(),
      articleInvoiceId: ReactDOM.findDOMNode(this.articleInvoiceId).value.trim(),
      articleCodeId: ReactDOM.findDOMNode(this.articleCodeId).value.trim(),
    };


    if (existingArticle) article._id = existingArticle;

    Meteor.call(methodToCall, article, (error, articleId) => {
      if (error) {
        Bert.alert(error.reason, 'danger','growl-top-right');
      } else {
        const confirmation = existingArticle ? 'Article updated!' : 'Article added!';
        this.form.reset();
        Bert.alert(confirmation, 'success','growl-top-right');
        history.push(`/articles/${articleId}`);
      }
    });
  }

  render() {
    const { article } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>

      <FormGroup>
        <ControlLabel>Article name</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="articleName"
          ref={articleName => (this.articleName = articleName)}
          defaultValue={article && article.articleName}
          placeholder="Add article name.."
        />
      </FormGroup>

      <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Article Description</ControlLabel>
      <FormControl
      name="articleDescription"
      componentClass="textarea"
      placeholder="Add article description..."
      ref={articleDescription => (this.articleDescription = articleDescription)}
      defaultValue={article && article.articleDescription} />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Article standard</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="articleStandard"
          ref={articleStandard => (this.articleStandard = articleStandard)}
          defaultValue={article && article.articleStandard}
          placeholder="Add article standard.."
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Article heat number</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="articleHeatNumber"
          ref={articleHeatNumber => (this.articleHeatNumber = articleHeatNumber)}
          defaultValue={article && article.articleHeatNumber}
          placeholder="Add article heat number.."
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Article quantity</ControlLabel>
        <input
          type="number"
          className="form-control"
          name="articleQuantity"
          ref={articleQuantity => (this.articleQuantity = articleQuantity)}
          defaultValue={article && article.articleQuantity}
          placeholder="Add article quantity.."
        />
      </FormGroup>

      <FormGroup>
        <ControlLabel>Article price</ControlLabel>
        <input
          type="number"
          className="form-control"
          name="articlePrice"
          ref={articlePrice => (this.articlePrice = articlePrice)}
          defaultValue={article && article.articlePrice}
          placeholder="Add article price.."
        />
      </FormGroup>


      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Article invoice number:</ControlLabel>
          <FormControl componentClass="select" name="articleInvoiceId" ref={articleInvoiceId => (this.articleInvoiceId = articleInvoiceId)} placeholder="Select article invoice number...">
          {this.props.invoices.map(function(invoice,i){
            return <option key={i} value={invoice._id} >{invoice.invoiceSupplier} | {invoice.invoiceNumber}</option>
          })}
          </FormControl>
      </FormGroup>

      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Article code:</ControlLabel>
          <FormControl componentClass="select" name="articleCodeId" ref={articleCodeId => (this.articleCodeId = articleCodeId)} placeholder="Select article code...">
          {this.props.codes.map(function(code,i){
            return <option key={i} value={code._id} >{code.codeValue}</option>
          })}
          </FormControl>
      </FormGroup>



      <Button type="submit" bsStyle="success">
        {article && article._id ? 'Save Changes' : 'Add article'}
      </Button>
    </form>);
  }
}

ArticleEditor.defaultProps = {
  article: {
    articleName: '',
    articleDescription: '',
    articleStandard: '',
    articleQuantity: 0,
    articlePrice: 0,
    articleTotalValue: 0,
    articleQRcode: '',
    articleInvoiceId:'',
    articleCodeId:'',
  },
};

ArticleEditor.propTypes = {
  article: PropTypes.object,
  history: PropTypes.object.isRequired,
};

//export default ArticleEditor;

export default createContainer(() => {

  const invoicesSubscription = Meteor.subscribe('invoices');
  const codesSubscription = Meteor.subscribe('codelists');
  const currentUser = Meteor.user();
  return {
    loadingInvoices: !invoicesSubscription.ready(),
    codesSubscription: !codesSubscription.ready(),
    invoices: InvoicesCollection.find({owner:currentUser._id}).fetch(),
    codes: CodesCollection.find({owner:currentUser._id}).fetch(),
  };
}, ArticleEditor);
