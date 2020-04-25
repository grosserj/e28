import Api from '@/common/api.js';

export const config = {
    firebase: {
        apiKey: 'AIzaSyDcgSvfP2QwKCu-wHdHbHzN2ovF5z3XXZM',
        projectId: 'e28-p2-jg'
    }
}

export const api = new Api({
    apiKey: config.firebase.apiKey,
    projectId: config.firebase.projectId
});


