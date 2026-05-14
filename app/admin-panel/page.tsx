"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleLogin = () => {
    // Silakan ganti password ini sesuai keinginan
    if (password === "admin123") {
      setIsAuthorized(true);
    } else {
      alert("Password salah!");
    }
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero-images/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      await supabase
        .from("landing_page")
        .update({ hero_image_url: publicUrl })
        .eq("id", 1);

      alert("Foto dari galeri berhasil diunggah!");
    } catch (error) {
      alert(
        'Gagal upload. Pastikan Bucket "images" sudah dibuat di Supabase Storage dan diset Public.',
      );
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const updateText = async () => {
    const { error } = await supabase
      .from("landing_page")
      .update({
        hero_title: newTitle,
        hero_description: newDesc,
      })
      .eq("id", 1);

    if (!error) alert("Teks berhasil diperbarui!");
  };

  // Tampilan Login
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#00132b]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-[#00132b] text-center">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Masukkan Password"
            className="border p-3 w-full mb-4 rounded text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#b89b5e] text-white font-bold py-3 rounded hover:bg-[#a38a53] transition"
          >
            Masuk ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Tampilan Dashboard setelah Login
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-12 text-black">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-[#00132b] mb-8 border-b pb-4">
          Panel Kontrol Yayasan
        </h1>

        {/* Update Teks */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Update Kata-kata
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Judul Utama Baru"
              className="w-full border p-3 rounded-lg"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Deskripsi/Kata Mutiara Baru"
              className="w-full border p-3 rounded-lg h-32"
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <button
              onClick={updateText}
              className="bg-[#00132b] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90"
            >
              Simpan Perubahan Teks
            </button>
          </div>
        </section>

        <hr className="my-10" />

        {/* Update Gambar */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Ganti Foto (Dari Galeri)
          </h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              disabled={uploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && (
              <p className="mt-4 text-blue-600 animate-pulse font-medium">
                Sedang memproses galeri...
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
