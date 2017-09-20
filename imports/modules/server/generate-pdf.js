import ReactDOMServer from 'react-dom/server';
import pdf from 'html-pdf';
import fs from 'fs';


let myModule;

const getBase64String = (path) => {
  try {
    const file = fs.readFileSync(path);
    return new Buffer(file).toString('base64');
  } catch (exception) {
    myModule.reject(exception);
  }
};

const generatePDF = (html, fileName) => {
  try {
    pdf.create(html, {
      format: 'A4',
      orientation: 'portrait',
      border: { top: '0.6in', right: '0.6in', bottom: '0.6in', left: '0.6in' },
    }).toFile(`./tmp/${fileName}`, (error, response) => {
      if (error) {

        myModule.reject(error);
      } else {

        myModule.resolve({ fileName, base64: getBase64String(response.filename) });
        fs.unlink(response.filename);
      }
    });
  } catch (exception) {
    myModule.reject(exception);
  }
};

const getComponentAsHTML = (component, props) => {

  try {
    return ReactDOMServer.renderToStaticMarkup(component(props));
  } catch (exception) {
    console.log(exception);
    myModule.reject(exception);
  }
};

const handler = ({ component, props, fileName }, promise) => {
  myModule = promise;
  const html = getComponentAsHTML(component, props);
  if (html && fileName) generatePDF(html, fileName);
};

export const generateComponentAsPDF = (options) => {

  return new Promise((resolve, reject) => {
    return handler(options, { resolve, reject });
  });
};
