const request = require('request');
const apiOptions = {
    server : 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://aqueous-peak-91782.herokuapp.com';
}

// PUBLIC EXPOSED METHODS

/* GET 'home' page */
const homelist = function(req, res){
    const path = '/api/agents';
    const requestOptions = {
      url : apiOptions.server + path,
      method : 'GET',
      json : {},
    };
    request(
      requestOptions,
      (err, response, body) => {
        let data = body;
        if (response.statusCode === 200 && data.length) {
           _renderHomepage(req, res, data);
        }
      }  
    );
};
 
/* GET 'Agent info' page */
const agentInfo = function(req, res){
    _getAgentInfo(req, res, (req, res, responseData) => {
      console.log(responseData);
      _renderDetailPage(req, res, responseData);
    });
  };

// PRIVATE METHODS

const _getAgentInfo = function(req, res, callback) {
    const path = `/api/agents/${req.params.agentid}`;
    const requestOptions = {
      url : apiOptions.server + path,
      method : 'GET',
      json : {}
    };
    request(
      requestOptions,
      (err, response, body) => {
        let data = body;
        if (response.statusCode === 200) {
          callback(req, res, data);
        } else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  };
  
const _renderHomepage = function(req, res, responseBody) {
let message = null;
if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
} else {
    if (!responseBody.length) {
    message = 'No agents found.';
    }
}
res.render('agents-list', {
    title: 'SupportApp - for all of your Support Team information',
    pageHeader: {
    title: 'SupportApp',
    strapline: 'Find information about the Support Team!'
    },
    sidebar: 'Looking for Support Team consultant information then you have come to the right place!',
    agents: responseBody,
    message: message
});
};
  
const _renderDetailPage = function(req, res, ageDetail) {
res.render('agent-info', {
    title: ageDetail.name,
    pageHeader: {
    title: ageDetail.name
    },
    sidebar: {
    context: 'is listed in SupportApp because he works for the Support Team.',
    },
    agent: ageDetail
});
};

const _isNumeric = function (n) {
return !isNaN(parseFloat(n)) && isFinite(n);
};
  
const _showError = function (req, res, status) {
let title = '';
let content = '';
if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear. Looks like we can\'t find this page. Sorry.'; 
} else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
}
res.status(status);
res.render('generic-text', {
    title : title,
    content : content
});
};
  
module.exports = {
    homelist,
    agentInfo,
};