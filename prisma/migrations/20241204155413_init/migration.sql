-- AlterTable
ALTER TABLE `peminjaman` MODIFY `status` ENUM('kembali', 'dipinjam', 'hilang') NOT NULL DEFAULT 'dipinjam';
