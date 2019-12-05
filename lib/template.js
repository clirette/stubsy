const _ = require("lodash");

const makeServiceParamsFromType = type => {
  switch (type) {
    case 'GET':
    case 'DELETE':
      return 'id'
    case 'PUT':
    case 'POST':
      return '(formData, id)'
  }
}

const addBody = type => {
  if (type === 'PUT' || type === 'POST') {
    return `,
    body: JSON.stringify(formData.name)`
  }
  return ''
}

exports.makeServiceFromTemplate = ({ name, type }) => `import { register } from 'async-ops'
import {
  getDefaultOptions,
  throwExceptionErrors,
  deserializeJsonResponse } from '../utils/fetch'
import { BASE_API_URL } from '../constants/url'

export const ${name} = '${name}'

export const service = async ${makeServiceParamsFromType(type)} => {
  const url = BASE_API_URL + '/<SOME_CONTROLLER>/' + id + '/'
  const options = {
    ...getDefaultOptions(),
    method: '${type}'${addBody(type)}
  }
  const response = await window.fetch(url, options)
  const item = await deserializeJsonResponse(response)
  throwExceptionErrors(item)
  return item
}

const mock = request => Promise.resolve({})

register(${name}, service, mock)
`;

exports.makeServiceFileName = service => {
  const words = service.toLowerCase().split("_");
  return (
    words[0] +
    words
      .slice(1)
      .map(word => _.upperFirst(word))
      .join("") +
    ".js"
  );
};
