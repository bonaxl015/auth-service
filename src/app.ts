import express, { Express } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import xssClean from 'xss-clean';
import mainRoutes from '@api/routes';
import { checkConnection } from '@db/config';
import errorHandler from '@middlewares/global/error-handler';

const app: Express = express();

// check database connection
checkConnection();

// body parser into json
app.use(express.json());

// added security for headers
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Prevent cross site scripting attacks
app.use(xssClean());

// Mount routing
app.use(mainRoutes);

// Error handler
app.use(errorHandler);

export default app;
