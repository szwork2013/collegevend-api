# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "chef/ubuntu-14.04"

  config.vm.box_check_update = false

  config.vm.network "private_network", type: "dhcp"

  # Forward Redis port
  config.vm.network "forwarded_port", guest: 6379, host: 6379

  # Forward MongoDB port
  config.vm.network "forwarded_port", guest: 27017, host: 27017

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
end
