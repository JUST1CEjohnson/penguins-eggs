# install Archlinux

## creare le partizioni
cfdisk /dev/sda

## formattare le partizioni
mkfs.ext4 /dev/sda1
mkswap /dev/sda2

## mounting delle partizioni
mount /dev/sda1 /mnt
swapon /dev/sda2

## installare sistema di base 
pacstrap /mnt bash-completion base base-devel grub linux linux-firmware nano networkmanager util-linux 

## generate fstab
genfstab -U /mnt >> /mnt/etc/fstab

## chroot
arch-chroot /mnt
ln -sf /usr/share/zoneinfo/Europe/Rome /etc/localtime
hwclock --systohc
nano /etc/locale.gen
nano /etc/locale.conf
    LANG=en_US.UTF-8
localectl set-keymap us
nano /etc/hostname
    naked
mkinitcpio -P
passwd
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
reboot

# isolinux.cfg
Aggiungo ad APPEND

archisobasedir=live archisolabel=naked cow_spacesize=4G

in questo modo, la live trov il disco naked e lo monta in
/run/archiso/bootmnt

Purtroppo la compatibilita finisce qua, archiso crea 

mkdir /run/archiso/cowspace/persistent-naked

a mano monto filesystem.squashfs 

mount /run/archiso/bootmnt/live/filesystem.squashfs /run/archiso/cowspace/persistent-naked

e provo a montaro in rw

mkdir /run/archiso/.work
mkdir /run/archiso/.upper
mount -t overlay overlay -o lowerdir=/run/archive/.lower,upperdir=/run/archive/.upper,workdir=/run/archive/.work /new_root

A rigor di logica dando exit dovrebbe andare, sfortunatamente non va!
