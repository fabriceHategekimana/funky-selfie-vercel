export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-white text-center py-8">
      <p>&copy; {currentYear} FunkySelfie. Tous droits réservés.</p>
      <p className="mt-2 text-sm text-gray-400">
        Location de Photobooth dans toute la Suisse
      </p>
    </footer>
  );
}
