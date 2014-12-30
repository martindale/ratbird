Ratbird
=======

[![Build Status](https://travis-ci.org/gordonwritescode/ratbird.svg?branch=master)](https://travis-ci.org/gordonwritescode/ratbird)

Ratbird is a transport agnostic notification system for Node. It provides tools
for dispatching notifications to a given target based on configurable
preferences.

## Usage

Install using Node Package Manager:

```
npm install ratbird
```

Create a notifier and dispatch notifications (see *Configuration and
Preferences* below):

```js
var ratbird  = require('ratbird');
var notifier = ratbird.createNotifier(config);

notifier.dispatch({
  title: 'You\'ve Got Mail!',
  content: 'Here is some notification content with <em>HTML</em>',
  object: { some: 'data', goes: 'here' }
}, prefs);
```

You can also create a stream that will dispatch notifications as they are
written to the stream.

```js
var dispatcher = ratbird.createDispatchStream(config);

dispatcher.write({
  title: 'You\'ve Got Mail!',
  content: 'Here is some notification content with <em>HTML</em>',
  object: { some: 'data', goes: 'here' },
  prefs: { /* ... */ }
});
```

## Configuration and Preferences

There are two distinct configurable objects needed for Ratbird to operate. The
`config` and the `prefs`.

The `config` object is needed to create a `Notifier` and contains the setup
information needed for each dispatcher:

```js
{
  sms: {
    accountSid: '',
    authToken: '', 
    senderTel: '+15555555555'
  },
  email: {
    user: '',
    pass:'',
    host: '',
    port: '',
    secure: true,
    from: ''
  },
  http: {
    url: 'http://localhost'
  },
  desktop: {  },
  dgram: {  }
}
```

The `prefs` object is needed to tell the dispatcher how to delvier a
notification. This is supplied with every call to `dispatch()`. If you are
using Mongoose, you can use
[mongoose-ratbird](https://github.com/gordonwritescode/mongoose-ratbird) to add
these preferences to your schemas.

```js
{
  sms:     { disabled: Boolean, tel: Number },
  email:   { disabled: Boolean, address: String },
  desktop: { disabled: Boolean },
  http:    { disabled: Boolean, url: String },
  dgram:   { disabled: Boolean, host: String, port: Number }
}
```
