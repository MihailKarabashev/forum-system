export const hasPermissions = (user, entity) => {
    if (user.id === entity.authorId || user.roleName === 'Admin') {
        return true;
    }

    return false;
}