const _ = require("lodash");

exports.makeServiceFromTemplate = ({ name, type }) => `
import { register } from 'async-ops'
import { getDefaultOptions, throwExceptionErrors, deserializeJsonResponse } from '../utils/fetch'
import { BASE_API_URL } from '../constants/url'

export const ${name} = '${name}'

export const service = async id => {
  const url = BASE_API_URL + '/<SOME_CONTROLLER>/' + id + '/'
  const options = {
    ...defaultOptions,
    method: '${type}'
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
