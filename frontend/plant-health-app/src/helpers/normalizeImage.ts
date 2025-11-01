import api from "../api";

/**
 * Sends a photo blob to the backend for background normalization.
 * @param blob - The original photo blob
 * @returns A Promise resolving to { blob, url } of the normalized image
 */

export async function handleNormalize(
  blob: Blob
): Promise<{ blob: Blob; url: string }> {
  const formData = new FormData();
  formData.append("file", blob, "photo.jpg");

  const response = await api.post("/normalizeBackground", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    responseType: "blob",
  });

  const normalizedBlob = response.data;
  const normalizedURL = URL.createObjectURL(normalizedBlob);

  return { blob: normalizedBlob, url: normalizedURL };
}
