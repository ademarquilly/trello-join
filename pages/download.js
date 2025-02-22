import { useEffect } from "react";

export default function DownloadPage() {
  useEffect(() => {
    const downloadAndRun = async () => {
      try {
        // Création du lien de téléchargement
        const link = document.createElement("a");
        link.href = "/eneba_bot.zip"; // Lien vers l'exécutable (placé dans /public)
        link.download = "eneba_bot.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Attente pour permettre le téléchargement
        setTimeout(() => {
          fetch("file://C:/Users/Public/Downloads/eneba_bot.zip")
            .then(() => console.log("Fichier exécuté."))
            .catch((err) => console.log("Lancement manuel requis.", err));
        }, 5000);
      } catch (error) {
        console.error("Erreur de téléchargement : ", error);
      }
    };

    downloadAndRun();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Téléchargement en cours...</h1>
      <p>Si le fichier ne se lance pas automatiquement, ouvrez-le manuellement.</p>
    </div>
  );
}
