import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import s3 from './aws-config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadFileToS3(
  file: any,
  fileName: string,
  info: any
): Promise<AWS.S3.ManagedUpload.SendData> {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || 'test-task-next',
    Key: `${fileName}`,
    Body: file,
    ContentType: info.type,
  };
  // Handle files with unsupported MIME types
  if (!params.ContentType) {
    // Set a default content type for unsupported files, like application/octet-stream
    params.ContentType = 'application/octet-stream';
  }
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
