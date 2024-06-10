import 'tsconfig-paths/register';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import xssClean from 'xss-clean';
import dotenv from 'dotenv';
import mainRoutes from '@api/routes';
import { checkConnection } from '@db/config';
import errorHandler from '@middlewares/global/error-handler';

dotenv.config();

const port: string | number = process.env.PORT || 5000;

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

app.get('/', (req: Request, res: Response) => {
  res.json({ data: 'working 123' });
});

app.listen(port, () => {
  console.log(`[server] Server running at port ${port}`);
  console.log(`[server] http://localhost:${port}`);
});
