import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Webhook } from 'svix';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from './User.model';


const clerkWebhooks = catchAsync(async (req, res) => {
  try {
    const whook = new Webhook(config.clerk_webhook_secret as string);

    await whook.verify(JSON.stringify(req.body), {
      'svix-id': req.headers['svix-id'] as string,
      'svix-timestamp': req.headers['svix-timestamp'] as string,
      'svix-signature': req.headers['svix-signature'] as string,
    });

    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await User.create(userData);

        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User created successfully',
          data: {},
        });

        break;
      }
      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await User.findOneAndUpdate({ clerkId: data.id }, userData);

        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User updated successfully',
          data: {},
        });

        break;
      }
      case 'user.deleted': {
        await User.findOneAndDelete({ clerkId: data.id });

        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User deleted successfully',
          data: {},
        });

        break;
      }

      default:
        break;
    }
  } catch (err: any) {
    console.log(err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong.');
  }
});

export const UserController = {
  clerkWebhooks,
};
