import { generateSignature } from "@/lib/cloudinary/generateSignature";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("img");
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;
    const API_KEY = process.env.CLOUDINARY_API_KEY;

    // Params
    const timestamp = Math.floor(Date.now() / 1000);
    const public_id = file.name;
    const upload_preset = "listImg";

    const signature = await generateSignature({ timestamp, public_id, upload_preset }, API_SECRET);

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("public_id", public_id);
    cloudinaryFormData.append("signature", signature);
    cloudinaryFormData.append("api_key", API_KEY);
    cloudinaryFormData.append("timestamp", timestamp);
    cloudinaryFormData.append("upload_preset", upload_preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
    });

    const cloudRes = await res.json();
    const photoURL = cloudRes.url;

    return Response.json({ success: true, photoURL });
  } catch (error) {
    return Response.json({ success: false, error });
  }
}
