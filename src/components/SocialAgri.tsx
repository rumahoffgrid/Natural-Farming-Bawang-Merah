import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, User, MapPin, PlusCircle, Search, Share2, Send, MessageCircle, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { ForumPost, ForumComment } from "../types";

export default function SocialAgri() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"Semua" | "Racikan Organik" | "Pasokan Pasar" | "Pencegahan Hama">("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State untuk form posting baru
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"Racikan Organik" | "Pasokan Pasar" | "Pencegahan Hama">("Racikan Organik");
  const [newAuthor, setNewAuthor] = useState("");
  const [newLocation, setNewLocation] = useState("Nganjuk, Jawa Timur");

  // State untuk form komentar aktif
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState("");

  const defaultPosts: ForumPost[] = [
    {
      id: "post-1",
      title: "Hasil Kocor Jeevamrutham Hari Ke-35 di Brebes",
      content: "Salam sedulur tani bawang. Di lahan saya Brebes Barat, saya coba murni pakai Jeevamrutham Cair 12% tanpa pupuk urea kimia sama sekali di musim ini. Hasilnya luar biasa, anakan bawang merah lebih banyak, batang daun sangat kaku dan tegak, warna hijau segar mantap. Biasanya di umur segini sudah rawan layu daun kuning, tapi ini masih kokoh!",
      category: "Racikan Organik",
      author: "Pak Sugeng",
      location: "Brebes, Jawa Tengah",
      avatar: "👨‍🌾",
      timestamp: "3 jam yang lalu",
      likes: 24,
      comments: [
        {
          id: "c-1",
          author: "Mas Adi",
          location: "Bantul",
          avatar: "🧑‍🌾",
          content: "Mantap Pak Sugeng! Kocornya tiap berapa hari sekali nggih? Di Bantul saya juga sedang coba dosis 10%.",
          timestamp: "2 jam yang lalu"
        },
        {
          id: "c-2",
          author: "Pak Sugeng",
          location: "Brebes",
          avatar: "👨‍🌾",
          content: "Mas Adi, saya kocor rutin tiap 7 hari sekali pas pagi jam 7 sebelum matahari terlalu terik.",
          timestamp: "1 jam yang lalu"
        }
      ]
    },
    {
      id: "post-2",
      title: "Waspada Serangan Ulat Grayak di Wilayah Nganjuk Selatan",
      content: "Info rekan-rekan sekalian, beberapa sawah tetangga di daerah Nganjuk Selatan mulai kemasukan ngengat ulat grayak. Sebaiknya segera semprotkan Neemastra (Mimba + Urin Sapi) malam/sore hari untuk mengusir kupu-kupu penelurnya sebelum terlambat. Jangan tunggu sampai daun berlubang transparan baru disemprot ya dulur.",
      category: "Pencegahan Hama",
      author: "Pak Warsito",
      location: "Nganjuk, Jawa Timur",
      avatar: "👴",
      timestamp: "5 jam yang lalu",
      likes: 18,
      comments: [
        {
          id: "c-3",
          author: "Cak Rohman",
          location: "Nganjuk",
          avatar: "🧑‍🌾",
          content: "Suwun infone Pak Warsito, langsung sore ini saya buat ramuan Neemastra segar di rumah.",
          timestamp: "4 jam yang lalu"
        }
      ]
    },
    {
      id: "post-3",
      title: "Rencana Panen Raya Kelompok Tani Makmur (Estimasi 15 Ton)",
      content: "Kabar gembira dari kelompok tani kami. Pekan depan kami siap melakukan panen raya bawang merah organik varietas Super Philip seluas 1.5 Hektar. Perkiraan hasil sekitar 15 Ton ubinan bersih. Bagi pedagang atau distributor yang mencari pasokan bawang segar bebas residu kimia dengan daya simpan lebih awet (karena pakai ghanajeevamrutham), monggo merapat atau PM untuk koordinasi harga.",
      category: "Pasokan Pasar",
      author: "Haji Mulyono",
      location: "Probolinggo, Jawa Timur",
      avatar: "👳‍♂️",
      timestamp: "1 hari yang lalu",
      likes: 32,
      comments: [
        {
          id: "c-4",
          author: "Yudi (Distributor)",
          location: "Surabaya",
          avatar: "🏢",
          content: "Sangat tertarik Pak Haji. Kebetulan pasar modern Surabaya sedang cari bawang merah organik premium. Saya kontak WA nggih.",
          timestamp: "18 jam yang lalu"
        }
      ]
    }
  ];

  // Load posts dari localStorage jika tersedia, atau pakai defaults
  useEffect(() => {
    const saved = localStorage.getItem("agri_smart_forum_posts");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(defaultPosts);
      }
    } else {
      setPosts(defaultPosts);
      localStorage.setItem("agri_smart_forum_posts", JSON.stringify(defaultPosts));
    }
  }, []);

  // Simpan posts ke local storage setiap kali ada perubahan
  const savePosts = (updated: ForumPost[]) => {
    setPosts(updated);
    localStorage.setItem("agri_smart_forum_posts", JSON.stringify(updated));
  };

  // Handle Like/Upvote
  const handleLike = (postId: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.hasLiked;
        return {
          ...post,
          likes: hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !hasLiked
        };
      }
      return post;
    });
    savePosts(updated);
  };

  // Handle Tambah Post Baru
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) {
      alert("Harap lengkapi semua isian formulir diskusi!");
      return;
    }

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category: newCategory,
      author: newAuthor,
      location: newLocation,
      avatar: "👨‍🌾",
      timestamp: "Baru saja",
      likes: 0,
      comments: []
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset Form & Tutup Modal
    setNewTitle("");
    setNewContent("");
    setNewAuthor("");
    setShowNewPostModal(false);
  };

  // Handle Tambah Komentar
  const handleAddComment = (postId: string) => {
    if (!commentText.trim() || !commenterName.trim()) {
      alert("Harap masukkan nama dan isi komentar Anda!");
      return;
    }

    const newComment: ForumComment = {
      id: `comment-${Date.now()}`,
      author: commenterName,
      location: "Petani Agri-Smart",
      avatar: "🧑‍🌾",
      content: commentText,
      timestamp: "Baru saja"
    };

    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });

    savePosts(updated);
    setCommentText("");
    setCommenterName("");
    setActiveCommentPostId(null);
  };

  // Filter posts berdasarkan pencarian dan kategori
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "Semua" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="social-agri-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-emerald-950 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <MessageSquare className="h-6 w-6 text-teal-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-sans tracking-tight">Jaringan Sosial Petani (Social-Agri)</h2>
              <p className="text-xs text-teal-100/90 mt-0.5">Ruang Diskusi & Koordinasi Budidaya Organik Bawang Merah Nusantara</p>
            </div>
          </div>

          <button
            onClick={() => setShowNewPostModal(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all self-start sm:self-auto shrink-0"
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            <span>Mulai Diskusi Baru</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Banner Motivasi Sosialisasi */}
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl p-4 text-xs leading-relaxed mb-6 flex gap-3">
          <Sparkles className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-950 font-bold block mb-1">Pentingnya Kolaborasi Komunitas Tani:</strong>
            Pertanian organik ZBNF mengandalkan keselarasan ekologi. Dengan berbagi pengalaman racikan lokal di sini, kita dapat mengantisipasi ledakan hama ulat grayak sewilayah secara kolektif, menjaga stabilitas harga pasokan bawang merah organik di pasar, serta menukar bahan starter urin/kotoran sapi setempat secara guyub rukun.
          </div>
        </div>

        {/* Toolbar Pencarian & Filter Kategori */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          {/* Input Cari */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari topik, nama petani, lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
            />
          </div>

          {/* Filter Tab Kategori */}
          <div className="flex flex-wrap gap-1.5 p-0.5 bg-gray-100 rounded-lg w-full md:w-auto">
            {(["Semua", "Racikan Organik", "Pasokan Pasar", "Pencegahan Hama"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  selectedCategory === cat 
                    ? "bg-white text-emerald-900 shadow-sm" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Diskusi / Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <MessageCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-gray-500">Belum Ada Topik Diskusi</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Silakan ketik pencarian lain atau mulai buat diskusi pertama Anda.</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const catColors = {
                "Racikan Organik": "bg-emerald-50 text-emerald-700 border-emerald-100",
                "Pasokan Pasar": "bg-blue-50 text-blue-700 border-blue-100",
                "Pencegahan Hama": "bg-amber-50 text-amber-700 border-amber-100"
              };

              return (
                <div key={post.id} className="border border-gray-100 rounded-2xl p-5 hover:border-emerald-100 hover:shadow-sm transition-all bg-white">
                  {/* Info Pengirim */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-lg shadow-sm">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-800">{post.author}</span>
                          <span className="text-[10px] text-gray-400">•</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                            <MapPin className="h-3 w-3 text-emerald-600" />
                            {post.location}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block mt-0.5">{post.timestamp}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${catColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Isi Post */}
                  <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1.5">{post.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{post.content}</p>

                  {/* Aksi Suka & Balas */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        post.hasLiked 
                          ? "text-emerald-600" 
                          : "text-gray-500 hover:text-emerald-600"
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${post.hasLiked ? "fill-emerald-600" : ""}`} />
                      <span>Suka ({post.likes})</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id);
                        setCommentText("");
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Balas ({post.comments.length})</span>
                    </button>
                  </div>

                  {/* Box Tambah Komentar */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nama Anda (Misal: Pak Slamet)"
                          value={commenterName}
                          onChange={(e) => setCommenterName(e.target.value)}
                          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 font-bold"
                        />
                        <span className="text-[10px] text-gray-400 flex items-center">
                          Berikan tanggapan agronomis yang sopan dan mendukung rekan tani.
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Tulis balasan Anda di sini..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors shrink-0"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List Komentar Bawah */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-emerald-100 space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-gray-800">{comment.author}</span>
                              <span className="text-[9px] text-gray-400">({comment.location})</span>
                            </div>
                            <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal Dialog Tambah Post Diskusi Baru */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-teal-200" />
                <h3 className="text-sm font-bold font-sans">Buat Topik Diskusi Baru</h3>
              </div>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-white/80 hover:text-white font-mono font-bold text-sm"
              >
                [X] Tutup
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1.5">Kategori Topik:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Racikan Organik", "Pasokan Pasar", "Pencegahan Hama"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`py-2 text-[11px] font-bold rounded-xl border text-center transition-all ${
                        newCategory === cat
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nama Anda (Petani):</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Mas Pur"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Kabupaten/Kota (Wilayah Sawah):</label>
                  <input
                    type="text"
                    required
                    placeholder="Misal: Nganjuk, Jatim"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Judul Diskusi:</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Sukses kocor ghanajeevamrutham di tanah kritis..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Isi Diskusi / Pengalaman Anda:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan dengan santai dan jelas detail pengalaman, dosis yang dipakai, atau koordinasi pasar yang diinginkan..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs"
              >
                Terbitkan Topik Diskusi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
