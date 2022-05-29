import AuthLayout from "../../components/layout/Authenticated"
import withProtected from '../../hoc/withProtected'
import { useUser } from '../../context/user'

const Main = () => {
  const uploadPdf = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };

  const user = useUser()
  const { email, uid } = user

  return (
    <AuthLayout title="Main">
      <div>
        <p>Email: <b>{email}</b></p>
        <br />
        <p>UID: <b>{uid}</b></p>
        <p>Upload a Pdf (max 1MB).</p>
      <input
        onChange={uploadPdf}
        type="file"
        accept="application/pdf"
      />
      </div>
    </AuthLayout>
  )
}

export default withProtected(Main)