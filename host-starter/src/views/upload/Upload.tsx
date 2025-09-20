import { Card, CardHeader } from '@/components/ui/card';
import MediaForm from './MediaForm';

const Upload = () => {
  return (
    <main className="p-4">
      <div className="w-full max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Upload</h2>
          </CardHeader>
          <MediaForm />
        </Card>
      </div>
    </main>
  );
};

export default Upload;
