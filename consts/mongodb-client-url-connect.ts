const DEFAULT_USER: string = 'HimatJutla';
const DEFAULT_PASSWORD: string = 'testPassword';
const DATABASE_NAME: string = 'TennisMatchTracker';
const mongoDbCLientConnectionUrl = `mongodb+srv://${DEFAULT_USER}:${DEFAULT_PASSWORD}@cluster0.insfs.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

export {mongoDbCLientConnectionUrl};
