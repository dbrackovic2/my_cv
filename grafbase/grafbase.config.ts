import { config, connector, graph, auth } from '@grafbase/sdk';

const g = graph.Single();

const provider = auth.JWT({
    issuer: "nextauth", secret: g.env('NEXTAUTH_SECRET'),
});

const mongo = connector.MongoDB('MongoDB', {
    url: g.env('MONGODB_API_URL'),
    apiKey: g.env('MONGODB_API_KEY'),
    dataSource: g.env('MONGODB_DATASOURCE'),
    database: g.env('MONGODB_DATABASE'),
});

mongo.model('User', {
    name: g.string(),
    email: g.string(),
    password: g.string(),
}).collection('users');

mongo.model('Message', {
    avatar: g.url().optional(),
    username: g.string(),
    receiverUsername: g.string(),
    body: g.string(),
}).collection('messages');

mongo.model('Chat', {
    members: g.string().list(),
    messages: g.string().list().optional(),
}).collection('chats');

g.datasource(mongo);

export default config({
    graph: g,
    auth: {
        providers: [provider],
        rules: rules => {
            rules.private()
        },
    },
});
