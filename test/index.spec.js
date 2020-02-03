// importamos la funcion que vamos a testear
import { emailLogin, createAccount } from '../src/lib/index.js';
import { googleLogin, getProfilePicUrl } from '../src/lib/google-auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();

mockfirestore.autoFlush();
mockauth.autoFlush();
const mockprovider = new firebasemock.MockFirebase();
mockprovider.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockfirestore.child(path) : null),
  () => mockauth,
  () => mockfirestore,
  () => mockprovider,
);


test('emailLogin debería ser una función', () => {
  expect(typeof emailLogin).toEqual('function');
});

test('createAccount debería ser una función', () => {
  expect(typeof createAccount).toEqual('function');
});

test('googleLogin debería ser una función', () => {
  expect(typeof googleLogin).toEqual('function');
});

test('getProfilePicUrl debería ser una función', () => {
  expect(typeof getProfilePicUrl).toEqual('function');
});
