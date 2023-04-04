import HTTPTransport from './HTTPTransport';
import {expect} from 'chai';
import {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from "sinon";

const sinon = require('sinon');

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    const originalXMLHttpRequest = global.XMLHttpRequest;

    before(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        // @ts-ignore
        global.XMLHttpRequest = xhr;
        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });
        instance = new HTTPTransport('/auth');
    });
    beforeEach(() => {
        requests.length = 0;

    })
    after(() => {
        global.XMLHttpRequest = originalXMLHttpRequest;
    })

    it('.get() should send GET request', () => {
        instance.get('/user');

        const [request] = requests;

        expect(request.method.toUpperCase()).to.eq('GET');
    });
});
