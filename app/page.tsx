"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Mail, MapPin, Menu, Sparkles, Users, X } from "lucide-react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const navLinks = [
  { href: "#home", label: "Beranda" },
  { href: "#announcements", label: "Pengumuman" },
  { href: "#gallery", label: "Galeri" },
  { href: "#programs", label: "Program" },
  { href: "#contact", label: "Kontak" },
];

const announcements = [
  {
    title: "Penerimaan Karyawan Baru",
    date: "Rabu, 6 Mei 2026",
    subtitle: "Mencari staf administrasi untuk tahun ajaran baru.",
    label: "Rekrutmen",
    image: "/rekrut.jpeg",
  },
  {
    title: "Tasmi Al-Qur'an",
    date: "Jum'at, 8 Mei 2026",
    subtitle: "Penampilan hafalan Al-Qur'an oleh santri.",
    label: "Program",
    image: "/belajar1.jpeg",
  },
  {
    title: "Tasmi Al-Qur'an",
    date: "Jum'at, 8 Mei 2026",
    subtitle: "Penampilan hafalan Al-Qur'an oleh santri.",
    label: "Program",
    image: "/belajar2.jpeg",
  },
];

const galleryItems = [
  {
    title: "Menghapal Al-Qur'an",
    date: "",
    subtitle: "Kegiatan rutin untuk meningkatkan hafalan Al-Qur'an.",
    image: "/kegiatan1.jpeg",
    detail: "Kegiatan rutin untuk meningkatkan hafalan Al-Qur'an.",
  },
  {
    title: "Metode cara menghapal Al-Qur'an",
    date: "",
    subtitle: "Mempelajari berbagai metode efektif untuk menghapal Al-Qur'an.",
    image: "/kegiatan2.jpeg",
    detail: "Mempelajari berbagai metode efektif untuk menghapal Al-Qur'an.",
  },
  {
    title: "Metode cara menghapal Al-Qur'an",
    date: "",
    subtitle: "Mempelajari berbagai metode efektif untuk menghapal Al-Qur'an.",
    image: "/kegiatan3.jpeg",
    detail: "Mempelajari berbagai metode efektif untuk menghapal Al-Qur'an.",
  },
  {
    title: "Kajian Parenting",
    date: "",
    subtitle: "Diskusi tumbuh kembang anak Islami.",
    image: "/kegiatan4.jpeg",
    detail:
      "Seminar orang tua dan wali murid mengenai pola asuh Islami yang selaras dengan pendidikan pesantren.",
  },
  {
    title: "israh mi'raj",
    date: "",
    subtitle: "Diskusi tentang perjalanan israh dan mi'raj.",
    image: "/kegiatan5.jpeg",
    detail: "Diskusi tentang perjalanan israh dan mi'raj.",
  },
  {
    title: "Belajar Kitab Ta'lim mutaalum",
    date: "",
    subtitle: "Pembelajaran tentang kitab ta'lim mutaalum.",
    image: "/kegiatan6.jpeg",
    detail: "Pembelajaran tentang kitab ta'lim mutaalum.",
  },
  {
    title: "Belajar Tilawah Al-Qur'an",
    date: "",
    subtitle: "Pembelajaran tentang tilawah Al-Qur'an dan beberapa nada.",
    image: "/kegiatan7.jpeg",
    detail: "Pembelajaran tentang tilawah Al-Qur'an dan beberapa nada.",
  },
  {
    title: "Belajar Kitab fiqih safitunnajah",
    date: "",
    subtitle: "Pembelajaran tentang kitab fiqih safitunnajah.",
    image: "/kegiatan8.jpeg",
    detail: "Pembelajaran tentang kitab fiqih safitunnajah.",
  },
  {
    title: "Pembagian buku pembelajaran",
    date: "",
    subtitle: "Pembagian buku pembelajaran kepada santri.",
    image: "/kegiatan9.jpeg",
    detail: "Pembagian buku pembelajaran kepada santri.",
  },
  {
    title: "Kegiatan Acara Tasmi' Hapalan Al-Qur'an 1 juz",
    date: "",
    subtitle: "Acara puncak kegiatan tasmi' hapalan Al-Qur'an.",
    image: "/kegiatan10.jpeg",
    detail:
      "Acara puncak kegiatan dengan penampilan hadroh, tilawah, dan pertunjukan kreatif dari santri.",
  },
  {
    title: "Membuat Karya Seni Kaligrafi",
    date: "",
    subtitle:
      "Kegiatan seni yang menggabungkan kreativitas dengan pembelajaran Al-Qur'an.",
    image: "/kegiatan11.jpeg",
    detail:
      "Kegiatan seni yang menggabungkan kreativitas dengan pembelajaran Al-Qur'an.",
  },
  {
    title: "Pentas Seni Santri",
    date: "",
    subtitle: "Peragaan seni budaya.",
    image: "/kegiatan12.jpeg",
    detail:
      "Acara puncak kegiatan dengan penampilan hadroh, tilawah, dan pertunjukan kreatif dari santri.",
  },
  {
    title: "Kegiatan lomba di Kota jambi",
    date: "",
    subtitle: "Kegiatan lomba yang diadakan di Kota Jambi .",
    image: "/kegiatan18.jpeg",
    detail:
      "Acara puncak kegiatan dengan penampilan hadroh, tilawah, dan pertunjukan kreatif dari santri.",
  },
  {
    title: "Pembagian sertifikat dan hadiah",
    date: "",
    subtitle:
      "Penghargaan bagi para peserta yang berhasil menyelesaikan program.",
    image: "/kegiatan14.jpeg",
    detail:
      "Acara puncak kegiatan dengan penampilan hadroh, tilawah, dan pertunjukan kreatif dari santri.",
  },
  {
    title: "Kegiatan lomba di Kota jambi",
    date: "",
    subtitle: "Kegiatan lomba yang diadakan di Kota Jambi.",
    image: "/kegiatan16.jpeg",
    detail:
      "Acara puncak kegiatan dengan penampilan hadroh, tilawah, dan pertunjukan kreatif dari santri.",
  },
  {
    title: "Pentas Seni Santri",
    date: "",
    subtitle: "Peragaan seni budaya dan ceramah singkat.",
    image: "/kegiatan17.jpeg",
    detail:
      "Acara puncak kegiatan dengan penampilan hadroh, tilawah, dan pertunjukan kreatif dari santri.",
  },
];

const features = [
  {
    icon: <Sparkles className="h-5 w-5 text-gold" />,
    title: "Premium Islamic Experience",
    description:
      "Pengajaran Al-Qur'an dan karakter Islami dalam lingkungan modern.",
  },
  {
    icon: <BookOpen className="h-5 w-5 text-gold" />,
    title: "Program Tahfidz Terstruktur",
    description:
      "Rangkaian kegiatan harian yang mendukung hafalan dan pemahaman.",
  },
  {
    icon: <Users className="h-5 w-5 text-gold" />,
    title: "Asrama Nyaman",
    description: "Fasilitas asrama yang tenang dan keamanan Islami 24/7.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGalleryItem, setActiveGalleryItem] = useState<
    (typeof galleryItems)[number] | null
  >(null);
  const [activeAnnouncement, setActiveAnnouncement] = useState<
    (typeof announcements)[number] | null
  >(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const rafId = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleGalleryNav = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const nextIndex =
      direction === "left"
        ? Math.max(0, currentSlide - 1)
        : Math.min(galleryItems.length - 1, currentSlide + 1);
    const nextItem = carouselRef.current.children[
      nextIndex
    ] as HTMLElement | null;
    if (nextItem) {
      nextItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentSlide(nextIndex);
    }
  };

  const openGalleryModal = (item: (typeof galleryItems)[number]) => {
    setActiveGalleryItem(item);
  };

  const closeGalleryModal = () => setActiveGalleryItem(null);

  const openAnnouncementModal = (item: (typeof announcements)[number]) => {
    setActiveAnnouncement(item);
  };

  const closeAnnouncementModal = () => setActiveAnnouncement(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
      anchors: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    const animate = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis.destroy();
    };
  }, []);
  return (
    <div className="relative overflow-hidden bg-[#eef3ff] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-[#1e3a8a] via-transparent to-transparent opacity-30" />

      <header className="sticky top-0 z-40 border-b border-white/25 bg-white/60 backdrop-blur-xl transition duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 xl:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1e3a8a] shadow-lg shadow-slate-950/10">
              <Image
                src="/logo-yayasan.jpeg"
                alt="Logo Darul Qur'an Mahani Al-Qubro"
                width={40}
                height={40}
                className="rounded-2xl object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">
                Yayasan Darul
              </p>
              <p className="text-sm text-slate-500">Mahani Al-Qubro</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-[#1e3a8a]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-gold/20 transition hover:-translate-y-0.5 hover:bg-[#f9e047] md:inline-flex"
            >
              Daftar Sekarang
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-900/5 transition hover:border-slate-300 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200/80 bg-white/95 px-6 py-5 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.2)] md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-2xl bg-[#1e3a8a] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#16316b]"
                onClick={() => setMenuOpen(false)}
              >
                Daftar Sekarang
              </a>
            </div>
          </div>
        )}
      </header>

      <main
        id="home"
        className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 xl:px-8"
      >
        <section className="min-h-[calc(100vh-120px)] grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,0.45fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-4 inline-flex rounded-full border border-gold/30 bg-white/85 px-4 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-[#92400e] shadow-sm shadow-slate-900/5">
              Premium Pesantren
            </p>
            <h1 className="font-heading text-5xl font-semibold leading-tight tracking-tight text-[#112153] sm:text-6xl">
              Yayasan Darul Mahani Al-Qubro
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              Menyatukan tradisi tafsir Al-Qur'an, tahfidz, dan kehidupan asrama
              dengan sentuhan desain modern untuk pengalaman belajar Islami yang
              elegan.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1e3a8a] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-[#16316b]"
              >
                Daftar Sekarang
              </a>
              <a
                href="#announcements"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
              >
                Pengumuman Mingguan
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative overflow-hidden rounded-4xl border border-white/80 bg-linear-to-br from-[#1e3a8a] via-[#1a4c9f] to-[#3b82f6] p-8 shadow-2xl shadow-slate-950/10"
          >
            <div
              className="absolute inset-x-0 top-0 h-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(250,204,21,0.18), transparent 55%)",
              }}
            />
            <div className="relative space-y-6 text-white">
              <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.28em] text-gold">
                  Visi Pesantren
                </p>
                <p className="mt-4 text-lg font-medium leading-8">
                  Menghadirkan generasi qur'ani yang cerdas, berakhlak mulia,
                  dan berwawasan global.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-sm text-slate-200">Lingkungan</p>
                  <p className="mt-2 text-xl font-semibold">Asrama Nyaman</p>
                </div>
                <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-sm text-slate-200">Kurikulum</p>
                  <p className="mt-2 text-xl font-semibold">Program Tahfidz</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="announcements"
          className="mt-20 min-h-[calc(100vh-120px)] scroll-mt-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#1e3a8a]">
              Informasi Mingguan
            </p>
            <h2 className="mt-4 text-3xl font-heading font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Pengumuman Kegiatan Pesantren
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Ikuti pengumuman mingguan kegiatan santri dengan informasi lengkap
              dan poster menarik. Klik untuk melihat detail lengkap.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {announcements.map((item, index) => (
              <motion.article
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => openAnnouncementModal(item)}
                className="group cursor-pointer overflow-hidden rounded-4xl border border-slate-200/70 bg-white/85 p-6 shadow-[0_18px_80px_-48px_rgba(30,58,138,0.45)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_90px_-40px_rgba(30,58,138,0.25)]"
              >
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={720}
                    height={480}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mb-4 mt-6 inline-flex items-center gap-2 rounded-full bg-[#1e3a8a]/5 px-3 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-[#1e3a8a]">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  {item.label}
                </div>
                <h3 className="text-2xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-slate-500">
                  {item.date}
                </p>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  {item.subtitle}
                </p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    Pesantren Center
                  </span>
                  <span className="rounded-full bg-gold/10 px-3 py-2 text-sm font-semibold text-[#92400e] transition group-hover:bg-gold/20">
                    Lihat Detail
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {activeAnnouncement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
              <div className="relative mx-auto w-full max-w-6xl h-[90vh] rounded-4xl bg-white shadow-2xl flex flex-col">
                <button
                  type="button"
                  onClick={closeAnnouncementModal}
                  className="absolute top-5 right-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex flex-col lg:flex-row gap-0 flex-1 min-h-0">
                  <div className="w-full lg:w-3/5 overflow-hidden rounded-t-4xl lg:rounded-t-none lg:rounded-l-4xl flex items-center justify-center bg-slate-50">
                    <Image
                      src={activeAnnouncement.image}
                      alt={activeAnnouncement.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <div className="w-full lg:w-2/5 space-y-6 p-6 sm:p-8 rounded-b-4xl lg:rounded-b-none lg:rounded-r-4xl overflow-y-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#1e3a8a]">
                      {activeAnnouncement.label}
                    </p>
                    <h3 className="text-3xl font-heading font-semibold text-slate-950">
                      {activeAnnouncement.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                      {activeAnnouncement.date}
                    </p>
                    <p className="text-base leading-7 text-slate-700">
                      {activeAnnouncement.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section
          id="gallery"
          className="mt-20 min-h-[calc(100vh-120px)] scroll-mt-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#1e3a8a]">
              Galeri Kegiatan
            </p>
            <h2 className="mt-4 text-3xl font-heading font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Carousel Kegiatan dan Spotlight Foto
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Geser poster kegiatan untuk melihat lebih banyak acara, lalu klik
              untuk membuka foto kegiatan dan detail acara secara penuh.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Lihat Semua
              </button>
            </div>
          </motion.div>
          <div className="mt-8">
            <div
              ref={carouselRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {galleryItems.map((item, index) => {
                const sizeClass =
                  index % 7 === 0 ? "h-96" : index % 5 === 0 ? "h-80" : "h-64";
                const colSpan =
                  index % 8 === 0 ? "sm:col-span-2 lg:col-span-2" : "";
                return (
                  <motion.article
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: index * 0.04 }}
                    onClick={() => openGalleryModal(item)}
                    className={`group cursor-pointer overflow-hidden rounded-4xl border border-slate-200/80 bg-white shadow-lg shadow-slate-950/5 transition duration-300 hover:-translate-y-1 ${colSpan}`}
                  >
                    <div
                      className={`overflow-hidden rounded-3xl ${sizeClass} bg-slate-100`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1200}
                        height={800}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-6 text-slate-600">
                        {item.subtitle}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {activeGalleryItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
              <div className="relative mx-auto w-full max-w-6xl h-[90vh] rounded-4xl bg-white shadow-2xl flex flex-col">
                <button
                  type="button"
                  onClick={closeGalleryModal}
                  className="absolute top-5 right-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg shadow-slate-950/10 transition hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex flex-col lg:flex-row gap-0 flex-1 min-h-0">
                  <div className="w-full lg:w-3/5 overflow-hidden rounded-t-4xl lg:rounded-t-none lg:rounded-l-4xl flex items-center justify-center bg-slate-50">
                    <Image
                      src={activeGalleryItem.image}
                      alt={activeGalleryItem.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <div className="w-full lg:w-2/5 space-y-6 p-6 sm:p-8 rounded-b-4xl lg:rounded-b-none lg:rounded-r-4xl overflow-y-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#1e3a8a]">
                      Galeri Kegiatan
                    </p>
                    <h3 className="text-3xl font-heading font-semibold text-slate-950">
                      {activeGalleryItem.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                      {activeGalleryItem.date}
                    </p>
                    <p className="text-base leading-7 text-slate-700">
                      {activeGalleryItem.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {lightboxOpen && (
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4">
              <div className="relative mx-auto w-full max-w-7xl h-[92vh] rounded-3xl bg-white shadow-2xl flex flex-col">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-md"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (i) =>
                          (i - 1 + galleryItems.length) % galleryItems.length,
                      )
                    }
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-md"
                    aria-label="Previous"
                  >
                    ‹
                  </button>

                  <div className="max-h-full w-full flex items-center justify-center">
                    <Image
                      src={galleryItems[lightboxIndex].image}
                      alt={galleryItems[lightboxIndex].title}
                      width={1400}
                      height={900}
                      className="max-h-[88vh] w-auto object-contain"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((i) => (i + 1) % galleryItems.length)
                    }
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-md"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </div>

                <div className="p-6 border-t bg-white">
                  <div className="mx-auto max-w-4xl text-center">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                      {galleryItems[lightboxIndex].date}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                      {galleryItems[lightboxIndex].title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {galleryItems[lightboxIndex].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section
          id="programs"
          className="mt-24 min-h-[calc(100vh-120px)] scroll-mt-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#1e3a8a]">
              Keunggulan Kami
            </p>
            <h2 className="mt-4 text-3xl font-heading font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Program dan Fasilitas Unggulan
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Kami menyediakan lingkungan belajar terbaik dengan program
              tahfidz, kaligrafi, dan pengembangan karakter Islami.
            </p>
          </motion.div>

          <div className="mt-12 rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-950/5">
            <div className="grid gap-10 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.1 }}
                  className="space-y-4 rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#1e3a8a]/10 text-[#1e3a8a] shadow-sm shadow-slate-950/5">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mt-24 min-h-[calc(100vh-120px)] rounded-4xl bg-[#112153] px-8 py-14 text-white shadow-2xl shadow-slate-950/15 scroll-mt-28"
        >
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold">
              Hubungi Kami
            </p>
            <h2 className="mt-4 text-3xl font-heading font-semibold tracking-tight text-white sm:text-4xl">
              Daftar dan Informasi Pendaftaran
            </h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm leading-7 text-slate-200">
                Siap membangun generasi qur'ani bersama kami? Hubungi tim
                pendaftaran untuk informasi kelas, kunjungan, dan beasiswa.
                Layaknya rumah ilmu yang hangat dan profesional.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <MapPin className="h-5 w-5 text-gold" />
                <span>
                  Kemenyan jaya RT 21 ,Desa Mekar jaya, Sungai Gelam , Muaro
                  Jambi, Jambi
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <Mail className="h-5 w-5 text-gold" />
                <span>info@darul-mahani.sch.id</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/15 px-4 py-2 text-sm text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://wa.me/6285361189307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/15 px-4 py-2 text-sm text-white"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/15 px-4 py-2 text-sm text-white"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-14 border-t border-slate-200/80 bg-white/95 px-6 py-10 text-slate-700 shadow-sm shadow-slate-900/5 xl:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1e3a8a] shadow-lg shadow-slate-950/10">
                <Image
                  src="/logo-yayasan.jpeg"
                  alt="Logo Darul Qur'an Mahani Al-Qubro"
                  width={40}
                  height={40}
                  className="rounded-2xl object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-slate-950">
                  Darul Qur'an Mahani Al-Qubro
                </p>
                <p className="text-sm text-slate-500">
                  Yayasan Pendidikan Al-Qur'an
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
              <a
                href="#home"
                className="text-sm transition hover:text-[#1e3a8a]"
              >
                Beranda
              </a>
              <a
                href="#announcements"
                className="text-sm transition hover:text-[#1e3a8a]"
              >
                Pengumuman
              </a>
              <a
                href="#gallery"
                className="text-sm transition hover:text-[#1e3a8a]"
              >
                Galeri
              </a>
              <a
                href="#programs"
                className="text-sm transition hover:text-[#1e3a8a]"
              >
                Program
              </a>
              <a
                href="#contact"
                className="text-sm transition hover:text-[#1e3a8a]"
              >
                Kontak
              </a>
            </div>

            <div className="text-sm text-slate-500">
              © 2026 Darul Qur'an Mahani Al-Qubro. Semua hak dilindungi.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
