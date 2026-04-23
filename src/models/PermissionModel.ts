import { AppDataSource } from '../dataSource.js';
import { Permission } from '../entities/Permission.js';

const permissionRepository = AppDataSource.getRepository(Permission);

export async function addPermission(
  projectId: string,
  userId: string,
  permission: `BANNED` | `VIEWER` | `EDITOR` | `ADMIN`,
): Promise<Permission> {
  const newPermission = new Permission();
  newPermission.projectId = projectId;
  newPermission.userId = userId;
  newPermission.permission = permission;

  return permissionRepository.save(newPermission);
}

export async function getPermissionsByProjectId(projectId: string): Promise<Permission[] | null> {
  return permissionRepository.find({ where: { projectId } });
}

export async function getPermissionsByUserId(userId: string): Promise<Permission[] | null> {
  return permissionRepository.find({ where: { userId } });
}

export async function getPermission(userId: string, projectId: string): Promise<Permission | null> {
  console.log(await permissionRepository.findOne({ where: { userId, projectId } }));
  console.log(JSON.stringify({ userId, projectId }, null, 2));
  return permissionRepository.findOne({ where: { userId, projectId } });
}

export async function getAllPermissions(): Promise<Permission[]> {
  return permissionRepository.find();
}
