
'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ height: 80,lastSku:''});
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.basspro.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

});

