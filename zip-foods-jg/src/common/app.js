import Api from '@/common/api.js';

export const config = {
    firebase: {
        apiKey: 'AIzaSyCGXoP_EgkNCNRhsR1lMYs_QBEEXnXUchU',
        projectId: 'e28-zipfoods-jg'
    }
}

export const api = new Api({
    apiKey: config.firebase.apiKey,
    projectId: config.firebase.projectId
});


