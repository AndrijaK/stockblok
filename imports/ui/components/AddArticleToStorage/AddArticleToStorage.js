import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../Loading/Loading';
import Select from 'react-select';

import ArticlesCollection from '../../../api/Articles/Articles';

class AddArticleToStorage extends React.Component {

  constructor(props) {
  super(props);
  this.updateValue = this.updateValue.bind(this);
  this.handleSubimt = this.handleSubimt.bind(this);
  this.state = {
    selectValue: ""
  };
  }

  componentDidMount() {


  }

  handleSubimt()
  {
    const { history } = this.props.history;
    storageId = this.props.storageId;

    selectedArticleId = this.state.selectValue.value;
    selectedArticle = ArticlesCollection.findOne({_id:selectedArticleId});

    storageArticle ={
      storageId:storageId,
      articleId:this.state.selectValue.value,
      articleName:this.state.selectValue.label,
      articleDescription: selectedArticle.articleDescription,
      articleStandard: selectedArticle.articleStandard,
      articleHeatNumber: selectedArticle.articleHeatNumber,
      articleQuantity: selectedArticle.articleQuantity,
      articlePrice: selectedArticle.articlePrice
    }

    Meteor.call('storages.updateStorageArticle', storageArticle, (error, result) => {

      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      else if(!result){
        Bert.alert( 'Article allready added to storage!', 'danger', 'growl-top-right' );
      }

      else {
          Bert.alert("Article added to storage!", 'success', 'growl-top-right');
      }
    });

  }

  updateValue (newValue) {

    this.setState({
			selectValue: newValue
		});

	}

  render() {

        let articlesArray = [];
        this.props.articles.map(function(article){
          articlesArray.push({value:article._id,label:article.articleName});
        });

        return (

            <div>
            <Select
            name="form-field-name"
            value={this.state.selectValue}
            options={articlesArray}
            onChange={this.updateValue}
            />

            <Button bsStyle="success" style={{marginTop:'5px'}} onClick={this.handleSubimt}>Add to storage</Button>
            </div>
        );

  }
}


export default createContainer(() => {
  const subscription = Meteor.subscribe('articles');
  const currentUser = Meteor.user();


  return {
    loading: !subscription.ready(),
    articles: ArticlesCollection.find({owner:currentUser._id}).fetch(),
  };
}, AddArticleToStorage);
