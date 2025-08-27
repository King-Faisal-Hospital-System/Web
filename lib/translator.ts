// Basic translations for testing when API is rate limited
const basicTranslations: { [key: string]: { [lang: string]: string } } = {
  // Navigation
  'Settings': { 'Kinyarwanda': 'Igenamiterere', 'French': 'Paramètres', 'Spanish': 'Configuración' },
  'Dashboard': { 'Kinyarwanda': 'Ikibaho', 'French': 'Tableau de bord', 'Spanish': 'Panel' },
  'Inventory': { 'Kinyarwanda': 'Ububiko', 'French': 'Inventaire', 'Spanish': 'Inventario' },
  'Reports': { 'Kinyarwanda': 'Raporo', 'French': 'Rapports', 'Spanish': 'Informes' },
  'Suppliers': { 'Kinyarwanda': 'Abatanga', 'French': 'Fournisseurs', 'Spanish': 'Proveedores' },
  'Invoices': { 'Kinyarwanda': 'Amafatura', 'French': 'Factures', 'Spanish': 'Facturas' },
  'Payments': { 'Kinyarwanda': 'Kwishyura', 'French': 'Paiements', 'Spanish': 'Pagos' },
  'Users': { 'Kinyarwanda': 'Abakoresha', 'French': 'Utilisateurs', 'Spanish': 'Usuarios' },
  'Support': { 'Kinyarwanda': 'Ubufasha', 'French': 'Support', 'Spanish': 'Soporte' },
  'Logout': { 'Kinyarwanda': 'Gusohoka', 'French': 'Déconnexion', 'Spanish': 'Cerrar sesión' },

  // Dashboard terms
  'Total Products': { 'Kinyarwanda': 'Ibicuruzwa Byose', 'French': 'Total des produits', 'Spanish': 'Total de productos' },
  'Low Stock': { 'Kinyarwanda': 'Ububiko Buke', 'French': 'Stock faible', 'Spanish': 'Stock bajo' },
  'Expiring Soon': { 'Kinyarwanda': 'Bizarangira Vuba', 'French': 'Expire bientôt', 'Spanish': 'Expira pronto' },
  'Recent Activities': { 'Kinyarwanda': 'Ibikorwa Bya Vuba', 'French': 'Activités récentes', 'Spanish': 'Actividades recientes' },
  'Quick Actions': { 'Kinyarwanda': 'Ibikorwa Byihuse', 'French': 'Actions rapides', 'Spanish': 'Acciones rápidas' },
  'Overview': { 'Kinyarwanda': 'Muri Rusange', 'French': 'Aperçu', 'Spanish': 'Resumen' },

  // Inventory terms
  'Add New Item': { 'Kinyarwanda': 'Ongeraho Ikintu Gishya', 'French': 'Ajouter un nouvel article', 'Spanish': 'Agregar nuevo artículo' },
  'Medicine Name': { 'Kinyarwanda': 'Izina ry\'Umuti', 'French': 'Nom du médicament', 'Spanish': 'Nombre del medicamento' },
  'Batch Number': { 'Kinyarwanda': 'Nomero y\'Itsinda', 'French': 'Numéro de lot', 'Spanish': 'Número de lote' },
  'Quantity': { 'Kinyarwanda': 'Ingano', 'French': 'Quantité', 'Spanish': 'Cantidad' },
  'Unit Price': { 'Kinyarwanda': 'Igiciro cy\'Igice', 'French': 'Prix unitaire', 'Spanish': 'Precio unitario' },
  'Expiry Date': { 'Kinyarwanda': 'Itariki yo Kurangira', 'French': 'Date d\'expiration', 'Spanish': 'Fecha de vencimiento' },
  'Category': { 'Kinyarwanda': 'Icyiciro', 'French': 'Catégorie', 'Spanish': 'Categoría' },
  'Status': { 'Kinyarwanda': 'Uko bimeze', 'French': 'Statut', 'Spanish': 'Estado' },

  // Reports terms
  'Generate Report': { 'Kinyarwanda': 'Kora Raporo', 'French': 'Générer un rapport', 'Spanish': 'Generar informe' },
  'Download Report': { 'Kinyarwanda': 'Manura Raporo', 'French': 'Télécharger le rapport', 'Spanish': 'Descargar informe' },
  'Inventory Report': { 'Kinyarwanda': 'Raporo y\'Ububiko', 'French': 'Rapport d\'inventaire', 'Spanish': 'Informe de inventario' },
  'Expiration Report': { 'Kinyarwanda': 'Raporo y\'Ibyarangiye', 'French': 'Rapport d\'expiration', 'Spanish': 'Informe de vencimiento' },
  'Report Status': { 'Kinyarwanda': 'Uko Raporo Imeze', 'French': 'Statut du rapport', 'Spanish': 'Estado del informe' },

  // Common actions
  'Save Changes': { 'Kinyarwanda': 'Bika Impinduka', 'French': 'Enregistrer', 'Spanish': 'Guardar cambios' },
  'Loading': { 'Kinyarwanda': 'Biratunganywa', 'French': 'Chargement', 'Spanish': 'Cargando' },
  'Add': { 'Kinyarwanda': 'Ongeraho', 'French': 'Ajouter', 'Spanish': 'Agregar' },
  'Edit': { 'Kinyarwanda': 'Hindura', 'French': 'Modifier', 'Spanish': 'Editar' },
  'Delete': { 'Kinyarwanda': 'Siba', 'French': 'Supprimer', 'Spanish': 'Eliminar' },
  'Search': { 'Kinyarwanda': 'Shakisha', 'French': 'Rechercher', 'Spanish': 'Buscar' },
  'Cancel': { 'Kinyarwanda': 'Hagarika', 'French': 'Annuler', 'Spanish': 'Cancelar' },
  'Confirm': { 'Kinyarwanda': 'Emeza', 'French': 'Confirmer', 'Spanish': 'Confirmar' },
  'Submit': { 'Kinyarwanda': 'Ohereza', 'French': 'Soumettre', 'Spanish': 'Enviar' },
  'Update': { 'Kinyarwanda': 'Vugurura', 'French': 'Mettre à jour', 'Spanish': 'Actualizar' },

  // Settings terms
  'General': { 'Kinyarwanda': 'Rusange', 'French': 'Général', 'Spanish': 'General' },
  'Backup': { 'Kinyarwanda': 'Kubika', 'French': 'Sauvegarde', 'Spanish': 'Copia de seguridad' },
  'Personal Information': { 'Kinyarwanda': 'Amakuru Yanjye', 'French': 'Informations personnelles', 'Spanish': 'Información personal' },
  'Name': { 'Kinyarwanda': 'Izina', 'French': 'Nom', 'Spanish': 'Nombre' },
  'Email': { 'Kinyarwanda': 'Imeyili', 'French': 'Email', 'Spanish': 'Correo' },
  'Phone': { 'Kinyarwanda': 'Telefoni', 'French': 'Téléphone', 'Spanish': 'Teléfono' },
  'Role': { 'Kinyarwanda': 'Uruhare', 'French': 'Rôle', 'Spanish': 'Rol' },
  'Currency': { 'Kinyarwanda': 'Ifaranga', 'French': 'Devise', 'Spanish': 'Moneda' },
  'Language': { 'Kinyarwanda': 'Ururimi', 'French': 'Langue', 'Spanish': 'Idioma' },
  'Timezone': { 'Kinyarwanda': 'Igihe', 'French': 'Fuseau horaire', 'Spanish': 'Zona horaria' },
  'Date Format': { 'Kinyarwanda': 'Uburyo bwo Kwandika Itariki', 'French': 'Format de date', 'Spanish': 'Formato de fecha' },
  'Regional Settings': { 'Kinyarwanda': 'Igenamiterere ry\'Akarere', 'French': 'Paramètres régionaux', 'Spanish': 'Configuración regional' },
  'System Status': { 'Kinyarwanda': 'Uko Sisitemu Imeze', 'French': 'État du système', 'Spanish': 'Estado del sistema' },
  'Last Backup': { 'Kinyarwanda': 'Kubika Kwa Nyuma', 'French': 'Dernière sauvegarde', 'Spanish': 'Última copia de seguridad' },
  'Create Backup Now': { 'Kinyarwanda': 'Kora Kubika Ubu', 'French': 'Créer une sauvegarde maintenant', 'Spanish': 'Crear copia ahora' },
  'Creating Backup': { 'Kinyarwanda': 'Gukora Kubika', 'French': 'Création de sauvegarde', 'Spanish': 'Creando copia' },

  // Status terms
  'Active': { 'Kinyarwanda': 'Gikora', 'French': 'Actif', 'Spanish': 'Activo' },
  'Inactive': { 'Kinyarwanda': 'Ntikikora', 'French': 'Inactif', 'Spanish': 'Inactivo' },
  'Available': { 'Kinyarwanda': 'Biraboneka', 'French': 'Disponible', 'Spanish': 'Disponible' },
  'Out of Stock': { 'Kinyarwanda': 'Byabuze', 'French': 'Rupture de stock', 'Spanish': 'Agotado' },
  'Expired': { 'Kinyarwanda': 'Byarangiye', 'French': 'Expiré', 'Spanish': 'Expirado' },
  'Success': { 'Kinyarwanda': 'Byagenze Neza', 'French': 'Succès', 'Spanish': 'Éxito' },
  'Error': { 'Kinyarwanda': 'Ikosa', 'French': 'Erreur', 'Spanish': 'Error' },
  'Warning': { 'Kinyarwanda': 'Iburira', 'French': 'Avertissement', 'Spanish': 'Advertencia' },

  // Common phrases
  'No data available': { 'Kinyarwanda': 'Nta makuru aboneka', 'French': 'Aucune donnée disponible', 'Spanish': 'No hay datos disponibles' },
  'No backups found': { 'Kinyarwanda': 'Nta kubika kwaboneka', 'French': 'Aucune sauvegarde trouvée', 'Spanish': 'No se encontraron copias' },
  'Configure system preferences, alerts and security': { 'Kinyarwanda': 'Shiraho igenamiterere rya sisitemu, iburira n\'umutekano', 'French': 'Configurer les préférences système, alertes et sécurité', 'Spanish': 'Configurar preferencias del sistema, alertas y seguridad' },

  // i18n keys - Common namespace
  'common.search': { 'Kinyarwanda': 'Shakisha', 'French': 'Rechercher', 'Spanish': 'Buscar' },
  'common.add': { 'Kinyarwanda': 'Ongeraho', 'French': 'Ajouter', 'Spanish': 'Agregar' },
  'common.edit': { 'Kinyarwanda': 'Hindura', 'French': 'Modifier', 'Spanish': 'Editar' },
  'common.delete': { 'Kinyarwanda': 'Siba', 'French': 'Supprimer', 'Spanish': 'Eliminar' },
  'common.save': { 'Kinyarwanda': 'Bika', 'French': 'Enregistrer', 'Spanish': 'Guardar' },
  'common.cancel': { 'Kinyarwanda': 'Hagarika', 'French': 'Annuler', 'Spanish': 'Cancelar' },
  'common.confirm': { 'Kinyarwanda': 'Emeza', 'French': 'Confirmer', 'Spanish': 'Confirmar' },
  'common.loading': { 'Kinyarwanda': 'Biratunganywa', 'French': 'Chargement', 'Spanish': 'Cargando' },
  'common.submit': { 'Kinyarwanda': 'Ohereza', 'French': 'Soumettre', 'Spanish': 'Enviar' },
  'common.update': { 'Kinyarwanda': 'Vugurura', 'French': 'Mettre à jour', 'Spanish': 'Actualizar' },

  // Navigation i18n keys
  'nav.dashboard': { 'Kinyarwanda': 'Ikibaho', 'French': 'Tableau de bord', 'Spanish': 'Panel' },
  'nav.inventory': { 'Kinyarwanda': 'Ububiko', 'French': 'Inventaire', 'Spanish': 'Inventario' },
  'nav.reports': { 'Kinyarwanda': 'Raporo', 'French': 'Rapports', 'Spanish': 'Informes' },
  'nav.suppliers': { 'Kinyarwanda': 'Abatanga', 'French': 'Fournisseurs', 'Spanish': 'Proveedores' },
  'nav.invoices': { 'Kinyarwanda': 'Amafatura', 'French': 'Factures', 'Spanish': 'Facturas' },
  'nav.payments': { 'Kinyarwanda': 'Kwishyura', 'French': 'Paiements', 'Spanish': 'Pagos' },
  'nav.users': { 'Kinyarwanda': 'Abakoresha', 'French': 'Utilisateurs', 'Spanish': 'Usuarios' },
  'nav.settings': { 'Kinyarwanda': 'Igenamiterere', 'French': 'Paramètres', 'Spanish': 'Configuración' },
  'nav.support': { 'Kinyarwanda': 'Ubufasha', 'French': 'Support', 'Spanish': 'Soporte' },
  'nav.logout': { 'Kinyarwanda': 'Gusohoka', 'French': 'Déconnexion', 'Spanish': 'Cerrar sesión' },

  // Dashboard i18n keys
  'dashboard.title': { 'Kinyarwanda': 'Ikibaho', 'French': 'Tableau de bord', 'Spanish': 'Panel' },
  'dashboard.overview': { 'Kinyarwanda': 'Muri Rusange', 'French': 'Aperçu', 'Spanish': 'Resumen' },
  'dashboard.totalProducts': { 'Kinyarwanda': 'Ibicuruzwa Byose', 'French': 'Total des produits', 'Spanish': 'Total de productos' },
  'dashboard.lowStock': { 'Kinyarwanda': 'Ububiko Buke', 'French': 'Stock faible', 'Spanish': 'Stock bajo' },
  'dashboard.expiringSoon': { 'Kinyarwanda': 'Bizarangira Vuba', 'French': 'Expire bientôt', 'Spanish': 'Expira pronto' },
  'dashboard.recentActivities': { 'Kinyarwanda': 'Ibikorwa Bya Vuba', 'French': 'Activités récentes', 'Spanish': 'Actividades recientes' },
  'dashboard.quickActions': { 'Kinyarwanda': 'Ibikorwa Byihuse', 'French': 'Actions rapides', 'Spanish': 'Acciones rápidas' },

  // Inventory i18n keys
  'inventory.title': { 'Kinyarwanda': 'Ububiko', 'French': 'Inventaire', 'Spanish': 'Inventario' },
  'inventory.addNewItem': { 'Kinyarwanda': 'Ongeraho Ikintu Gishya', 'French': 'Ajouter un nouvel article', 'Spanish': 'Agregar nuevo artículo' },
  'inventory.medicineName': { 'Kinyarwanda': 'Izina ry\'Umuti', 'French': 'Nom du médicament', 'Spanish': 'Nombre del medicamento' },
  'inventory.batchNumber': { 'Kinyarwanda': 'Nomero y\'Itsinda', 'French': 'Numéro de lot', 'Spanish': 'Número de lote' },
  'inventory.quantity': { 'Kinyarwanda': 'Ingano', 'French': 'Quantité', 'Spanish': 'Cantidad' },
  'inventory.unitPrice': { 'Kinyarwanda': 'Igiciro cy\'Igice', 'French': 'Prix unitaire', 'Spanish': 'Precio unitario' },
  'inventory.expiryDate': { 'Kinyarwanda': 'Itariki yo Kurangira', 'French': 'Date d\'expiration', 'Spanish': 'Fecha de vencimiento' },
  'inventory.category': { 'Kinyarwanda': 'Icyiciro', 'French': 'Catégorie', 'Spanish': 'Categoría' },
  'inventory.status': { 'Kinyarwanda': 'Uko bimeze', 'French': 'Statut', 'Spanish': 'Estado' },

  // Reports i18n keys
  'reports.title': { 'Kinyarwanda': 'Raporo', 'French': 'Rapports', 'Spanish': 'Informes' },
  'reports.generate': { 'Kinyarwanda': 'Kora Raporo', 'French': 'Générer un rapport', 'Spanish': 'Generar informe' },
  'reports.download': { 'Kinyarwanda': 'Manura Raporo', 'French': 'Télécharger le rapport', 'Spanish': 'Descargar informe' },
  'reports.inventoryReport': { 'Kinyarwanda': 'Raporo y\'Ububiko', 'French': 'Rapport d\'inventaire', 'Spanish': 'Informe de inventario' },
  'reports.expirationReport': { 'Kinyarwanda': 'Raporo y\'Ibyarangiye', 'French': 'Rapport d\'expiration', 'Spanish': 'Informe de vencimiento' },
  'reports.status': { 'Kinyarwanda': 'Uko Raporo Imeze', 'French': 'Statut du rapport', 'Spanish': 'Estado del informe' },

  // Settings i18n keys
  'settings.title': { 'Kinyarwanda': 'Igenamiterere', 'French': 'Paramètres', 'Spanish': 'Configuración' },
  'settings.general': { 'Kinyarwanda': 'Rusange', 'French': 'Général', 'Spanish': 'General' },
  'settings.backup': { 'Kinyarwanda': 'Kubika', 'French': 'Sauvegarde', 'Spanish': 'Copia de seguridad' },
  'settings.personalInfo': { 'Kinyarwanda': 'Amakuru Yanjye', 'French': 'Informations personnelles', 'Spanish': 'Información personal' },
  'settings.name': { 'Kinyarwanda': 'Izina', 'French': 'Nom', 'Spanish': 'Nombre' },
  'settings.email': { 'Kinyarwanda': 'Imeyili', 'French': 'Email', 'Spanish': 'Correo' },
  'settings.phone': { 'Kinyarwanda': 'Telefoni', 'French': 'Téléphone', 'Spanish': 'Teléfono' },
  'settings.role': { 'Kinyarwanda': 'Uruhare', 'French': 'Rôle', 'Spanish': 'Rol' },
  'settings.currency': { 'Kinyarwanda': 'Ifaranga', 'French': 'Devise', 'Spanish': 'Moneda' },
  'settings.language': { 'Kinyarwanda': 'Ururimi', 'French': 'Langue', 'Spanish': 'Idioma' },
  'settings.timezone': { 'Kinyarwanda': 'Igihe', 'French': 'Fuseau horaire', 'Spanish': 'Zona horaria' },
  'settings.dateFormat': { 'Kinyarwanda': 'Uburyo bwo Kwandika Itariki', 'French': 'Format de date', 'Spanish': 'Formato de fecha' },
  'settings.regionalSettings': { 'Kinyarwanda': 'Igenamiterere ry\'Akarere', 'French': 'Paramètres régionaux', 'Spanish': 'Configuración regional' },
  'settings.systemStatus': { 'Kinyarwanda': 'Uko Sisitemu Imeze', 'French': 'État du système', 'Spanish': 'Estado del sistema' },
  'settings.lastBackup': { 'Kinyarwanda': 'Kubika Kwa Nyuma', 'French': 'Dernière sauvegarde', 'Spanish': 'Última copia de seguridad' },
  'settings.createBackup': { 'Kinyarwanda': 'Kora Kubika Ubu', 'French': 'Créer une sauvegarde maintenant', 'Spanish': 'Crear copia ahora' },
  'settings.creatingBackup': { 'Kinyarwanda': 'Gukora Kubika', 'French': 'Création de sauvegarde', 'Spanish': 'Creando copia' },

  // Status i18n keys
  'status.active': { 'Kinyarwanda': 'Gikora', 'French': 'Actif', 'Spanish': 'Activo' },
  'status.inactive': { 'Kinyarwanda': 'Ntikikora', 'French': 'Inactif', 'Spanish': 'Inactivo' },
  'status.available': { 'Kinyarwanda': 'Biraboneka', 'French': 'Disponible', 'Spanish': 'Disponible' },
  'status.outOfStock': { 'Kinyarwanda': 'Byabuze', 'French': 'Rupture de stock', 'Spanish': 'Agotado' },
  'status.expired': { 'Kinyarwanda': 'Byarangiye', 'French': 'Expiré', 'Spanish': 'Expirado' },
  'status.success': { 'Kinyarwanda': 'Byagenze Neza', 'French': 'Succès', 'Spanish': 'Éxito' },
  'status.error': { 'Kinyarwanda': 'Ikosa', 'French': 'Erreur', 'Spanish': 'Error' },
  'status.warning': { 'Kinyarwanda': 'Iburira', 'French': 'Avertissement', 'Spanish': 'Advertencia' },

  // Form i18n keys
  'form.required': { 'Kinyarwanda': 'Birakenewe', 'French': 'Requis', 'Spanish': 'Requerido' },
  'form.optional': { 'Kinyarwanda': 'Ntabwo Bikenewe', 'French': 'Optionnel', 'Spanish': 'Opcional' },
  'form.pleaseWait': { 'Kinyarwanda': 'Tegereza', 'French': 'Veuillez patienter', 'Spanish': 'Por favor espere' },
  'form.processing': { 'Kinyarwanda': 'Biratunganywa', 'French': 'Traitement en cours', 'Spanish': 'Procesando' },

  // Additional page content
  'Inventory Management overview': { 'Kinyarwanda': 'Incamake y\'ubuyobozi bw\'ububiko', 'French': 'Aperçu de la gestion des stocks', 'Spanish': 'Resumen de gestión de inventario' },
  'Active stock items': { 'Kinyarwanda': 'Ibintu bikora mu bubiko', 'French': 'Articles en stock actifs', 'Spanish': 'Artículos de stock activos' },
  'Below reorder point': { 'Kinyarwanda': 'Munsi y\'urwego rwo kongera gutumiza', 'French': 'En dessous du point de réapprovisionnement', 'Spanish': 'Por debajo del punto de reorden' },
  'Within 60 days': { 'Kinyarwanda': 'Mu minsi 60', 'French': 'Dans les 60 jours', 'Spanish': 'Dentro de 60 días' },
  'Top Products': { 'Kinyarwanda': 'Ibicuruzwa Byambere', 'French': 'Meilleurs produits', 'Spanish': 'Productos principales' },
  'No recent activities': { 'Kinyarwanda': 'Nta bikorwa bya vuba', 'French': 'Aucune activité récente', 'Spanish': 'No hay actividades recientes' },
  'Error loading products': { 'Kinyarwanda': 'Ikosa mu gupakurura ibicuruzwa', 'French': 'Erreur de chargement des produits', 'Spanish': 'Error cargando productos' },
  'No products found': { 'Kinyarwanda': 'Nta bicuruzwa byabonetse', 'French': 'Aucun produit trouvé', 'Spanish': 'No se encontraron productos' },
  'Issued': { 'Kinyarwanda': 'Byatanzwe', 'French': 'Émis', 'Spanish': 'Emitido' },
  'Dr. Dylan': { 'Kinyarwanda': 'Dr. Dylan', 'French': 'Dr. Dylan', 'Spanish': 'Dr. Dylan' },
  'Pharmacist': { 'Kinyarwanda': 'Umuganga w\'imiti', 'French': 'Pharmacien', 'Spanish': 'Farmacéutico' },

  // Inventory page content
  'Inventory Management': { 'Kinyarwanda': 'Ubuyobozi bw\'Ububiko', 'French': 'Gestion des stocks', 'Spanish': 'Gestión de inventario' },
  'Add Product': { 'Kinyarwanda': 'Ongeraho Igicuruzwa', 'French': 'Ajouter un produit', 'Spanish': 'Agregar producto' },
  'Add new product': { 'Kinyarwanda': 'Ongeraho igicuruzwa gishya', 'French': 'Ajouter un nouveau produit', 'Spanish': 'Agregar nuevo producto' },
  'More options': { 'Kinyarwanda': 'Ibindi byinshi', 'French': 'Plus d\'options', 'Spanish': 'Más opciones' },
  'View Details': { 'Kinyarwanda': 'Reba Amakuru Arambuye', 'French': 'Voir les détails', 'Spanish': 'Ver detalles' },
  'Edit Product': { 'Kinyarwanda': 'Hindura Igicuruzwa', 'French': 'Modifier le produit', 'Spanish': 'Editar producto' },
  'Record Receipt': { 'Kinyarwanda': 'Andika Kwakira', 'French': 'Enregistrer la réception', 'Spanish': 'Registrar recibo' },
  'Issue Stock': { 'Kinyarwanda': 'Tanga Ububiko', 'French': 'Émettre le stock', 'Spanish': 'Emitir stock' },
  'Batch': { 'Kinyarwanda': 'Itsinda', 'French': 'Lot', 'Spanish': 'Lote' },
  'Received': { 'Kinyarwanda': 'Byakiriwe', 'French': 'Reçu', 'Spanish': 'Recibido' },
  'Balance': { 'Kinyarwanda': 'Ibisigaye', 'French': 'Solde', 'Spanish': 'Balance' },
  'Expiry': { 'Kinyarwanda': 'Kurangira', 'French': 'Expiration', 'Spanish': 'Vencimiento' },
  'Unit Cost': { 'Kinyarwanda': 'Igiciro cy\'Igice', 'French': 'Coût unitaire', 'Spanish': 'Costo unitario' },
  'Total Value': { 'Kinyarwanda': 'Agaciro Rusange', 'French': 'Valeur totale', 'Spanish': 'Valor total' },
  'Low stock level': { 'Kinyarwanda': 'Urwego rw\'ububiko buke', 'French': 'Niveau de stock faible', 'Spanish': 'Nivel de stock bajo' },
  'Only': { 'Kinyarwanda': 'Gusa', 'French': 'Seulement', 'Spanish': 'Solo' },
  'units remaining (Reorder needed)': { 'Kinyarwanda': 'ibice bisigaye (Gukoresha kwongera gutumiza)', 'French': 'unités restantes (Réapprovisionnement nécessaire)', 'Spanish': 'unidades restantes (Se necesita reorden)' },
  'Total': { 'Kinyarwanda': 'Rusange', 'French': 'Total', 'Spanish': 'Total' },
  'medicines': { 'Kinyarwanda': 'imiti', 'French': 'médicaments', 'Spanish': 'medicinas' },
  'Low': { 'Kinyarwanda': 'Buke', 'French': 'Faible', 'Spanish': 'Bajo' },
  'Value': { 'Kinyarwanda': 'Agaciro', 'French': 'Valeur', 'Spanish': 'Valor' },
  'Export List': { 'Kinyarwanda': 'Kohereza Urutonde', 'French': 'Exporter la liste', 'Spanish': 'Exportar lista' },
  'Close modal': { 'Kinyarwanda': 'Funga idirishya', 'French': 'Fermer la fenêtre', 'Spanish': 'Cerrar ventana' },
  'Receive Stock': { 'Kinyarwanda': 'Kwakira Ububiko', 'French': 'Recevoir le stock', 'Spanish': 'Recibir stock' },
  'Close': { 'Kinyarwanda': 'Funga', 'French': 'Fermer', 'Spanish': 'Cerrar' },
  'Description': { 'Kinyarwanda': 'Ibisobanuro', 'French': 'Description', 'Spanish': 'Descripción' },
  'Notes': { 'Kinyarwanda': 'Inyandiko', 'French': 'Notes', 'Spanish': 'Notas' },
  'Supplier': { 'Kinyarwanda': 'Utanga', 'French': 'Fournisseur', 'Spanish': 'Proveedor' },
  'Form': { 'Kinyarwanda': 'Ifishi', 'French': 'Forme', 'Spanish': 'Forma' },
  'Notifications': { 'Kinyarwanda': 'Imenyesha', 'French': 'Notifications', 'Spanish': 'Notificaciones' },
  'User profile': { 'Kinyarwanda': 'Umwirondoro w\'ukoresha', 'French': 'Profil utilisateur', 'Spanish': 'Perfil de usuario' },
  'Search inventory': { 'Kinyarwanda': 'Shakisha ububiko', 'French': 'Rechercher dans l\'inventaire', 'Spanish': 'Buscar inventario' }
};


interface TranslationCache {
  [key: string]: {
    [language: string]: string;
  };
}

class TranslationService {
  private cache: TranslationCache = {};
  private apiKey: string;
  private baseUrl = 'https://api.mymemory.translated.net/get';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || '';
  }

  // Hybrid translation service with fallback
  async translateText(text: string, targetLanguage: string, sourceLanguage = 'en'): Promise<string> {
   
    if (targetLanguage === 'English') {
      return text;
    }

    const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`;
    
  
    if (this.cache[text] && this.cache[text][targetLanguage]) {
      return this.cache[text][targetLanguage];
    }

    
    if (basicTranslations[text] && basicTranslations[text][targetLanguage]) {
      const translation = basicTranslations[text][targetLanguage];
     
      if (!this.cache[text]) {
        this.cache[text] = {};
      }
      this.cache[text][targetLanguage] = translation;
      return translation;
    }

    try {
      
      const url = `${this.baseUrl}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${this.getLanguageCode(targetLanguage)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        const translatedText = data.responseData.translatedText;
        
        // Cache the translation
        if (!this.cache[text]) {
          this.cache[text] = {};
        }
        this.cache[text][targetLanguage] = translatedText;
        
        return translatedText;
      } else {
        console.warn(`Translation API failed for "${text}":`, data);
        return text; 
      }
    } catch (error) {
      console.error('Translation error:', error);
      return text; 
    }
  }

 
  async translateBatch(texts: string[], targetLanguage: string, sourceLanguage = 'en'): Promise<{ [key: string]: string }> {
    const translations: { [key: string]: string } = {};
    
    
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      translations[text] = await this.translateText(text, targetLanguage, sourceLanguage);
      
    
      if (i < texts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return translations;
  }

  // Get language code for API
  private getLanguageCode(language: string): string {
    const languageCodes: { [key: string]: string } = {
      'English': 'en',
      'Kinyarwanda': 'rw',
      'Spanish': 'es',
      'French': 'fr',
      'Español': 'es',
      'Français': 'fr'
    };
    
    return languageCodes[language] || 'en';
  }

  // Clear cache
  clearCache(): void {
    this.cache = {};
  }

  // Get cached translations
  getCache(): TranslationCache {
    return this.cache;
  }

  // Load cache from storage
  loadCache(cache: TranslationCache): void {
    this.cache = cache;
  }
}

// Export function to get basic translations synchronously
export const getBasicTranslation = (text: string, targetLanguage: string): string | null => {
  if (basicTranslations[text] && basicTranslations[text][targetLanguage]) {
    return basicTranslations[text][targetLanguage];
  }
  return null;
};

// Export the translation service instance
export const translationService = new TranslationService();

// Export the main translation function
export const translateText = (text: string, targetLanguage: string, sourceLanguage = 'en'): Promise<string> => {
  return translationService.translateText(text, targetLanguage, sourceLanguage);
};

// Hook for React components
export const useTranslator = () => {
  const translate = async (text: string, targetLanguage: string): Promise<string> => {
    return await translateText(text, targetLanguage);
  };

  const translateBatch = async (texts: string[], targetLanguage: string): Promise<{ [key: string]: string }> => {
    return await translationService.translateBatch(texts, targetLanguage);
  };

  return { translate, translateBatch };
};
