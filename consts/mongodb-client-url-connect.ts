const DEFAULT_USER: string = 'HimatJutla';
const DEFAULT_PASSWORD: string = 'testPassword';
const mongoDbCLientConnectionUrl = `mongodb+srv://${DEFAULT_USER}:${DEFAULT_PASSWORD}@cluster0.insfs.mongodb.net/TennisMatchesTracker?retryWrites=true&w=majority`;

export {mongoDbCLientConnectionUrl};
