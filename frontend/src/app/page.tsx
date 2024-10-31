import VideoList from "@/components/VideoList";
import VideoUpload from "@/components/VideoUpload";

export default function Home() {
  return (
    <main>
        <div>
            <VideoUpload />
            <VideoList />
        </div>
    </main>
  );
}
