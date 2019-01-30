# hrms-api

<!-- 
`main_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(60) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `level` int(11) unsigned DEFAULT NULL,
  `isactive` tinyint(1) unsigned DEFAULT '1' COMMENT '1=active,0=inactive',
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `createdby` int(11) unsigned DEFAULT NULL,
  `modifiedby` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
)

`main_roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rolename` varchar(100) NOT NULL,
  `roletype` varchar(100) DEFAULT NULL,
  `roledescription` varchar(100) DEFAULT NULL,
  `group_id` int(11) unsigned DEFAULT NULL,
  `levelid` int(11) DEFAULT NULL,
  `createdby` int(11) unsigned DEFAULT NULL,
  `modifiedby` int(11) unsigned DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `isactive` tinyint(1) unsigned DEFAULT '1' COMMENT '1=active,0=inactive',
  PRIMARY KEY (`id`),
  KEY `NewIndex1` (`group_id`)
)

 `main_privileges` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role` int(11) unsigned DEFAULT NULL,
  `group_id` int(11) unsigned DEFAULT NULL,
  `object` int(11) unsigned DEFAULT NULL,
  `addpermission` varchar(10) DEFAULT NULL,
  `editpermission` varchar(10) DEFAULT NULL,
  `deletepermission` varchar(10) DEFAULT NULL,
  `viewpermission` varchar(10) DEFAULT NULL,
  `uploadattachments` varchar(10) DEFAULT NULL,
  `viewattachments` varchar(10) DEFAULT NULL,
  `createdby` int(11) unsigned DEFAULT NULL,
  `modifiedby` int(11) unsigned DEFAULT NULL,
  `createddate` datetime DEFAULT NULL,
  `modifieddate` datetime DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
)
  -->