import issueStrats from '../issue-strategies/index.js';
import * as promiseUtils from '../promise-utils.js';

function validateStrategies(issueKey, jiraClientAPI) {
  return jiraClientAPI.findIssue(issueKey)
    .then(content =>
      issueStrats[content.fields.issuetype.name].apply(content, jiraClientAPI)
    );
}

export default function apply(issues, jiraClientAPI) {
  return promiseUtils.anyPromise(issues.map(i => validateStrategies(i, jiraClientAPI)));
}
