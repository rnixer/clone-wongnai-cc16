const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.get = async (username) =>
    await prisma.user.findFirst({
        where: {
            OR: [{ email: username }, { mobile: username }],
        },
    })
module.exports.getAll = async () => await prisma.user.findMany()
module.exports.create = async (data) => await prisma.user.create({ data })
module.exports.update = async (id, data) => await prisma.user.update({ where: { id }, data })
module.exports.delete = async ({ id }) => await prisma.user.delete({ where: { id } })

// =========================================== CUSTOM REPOSITORY ===================================
module.exports.emailIsDuplicate = async (email) => await prisma.user.findFirst({ where: { email } })
module.exports.mobileIsDupplicate = async (mobile) => await prisma.user.findFirst({ where: { mobile } })

module.exports.getMe = () => {}

module.exports.findUserFacebook = async (facebookId) => await prisma.user.findFirst({ where: { facebookId } })
module.exports.createUserLoginWithFacebook = async ({ facebookId, name }) => await prisma.user.create({ data: { facebookId, name } })

module.exports.findUserGoogle = async (googleId) => await prisma.user.findFirst({ where: { googleId } })
module.exports.registerGoogle = async (googleId, name, imgProfile) => await prisma.user.create({ data: { googleId, name, imgProfile } })

module.exports.userGetProfile = async (id) => await prisma.user.findFirst({ where: { id } })

module.exports.createReview = async (data) =>
    await prisma.review.create({
        data: {
            userId: data.userId,
            restaurantId: data.restaurantId,
            star: data.star,
            title: data.title,
            description: data.description,
            reviewImgs: { createMany: { data: [{ img: "asdf" }, { img: "asdf" }] } },
        },
    })
module.exports.getReview = async (userId) =>
    await prisma.review.findMany({ where: { userId }, include: { restaurant: { include: { restaurantImages: true } }, reviewImgs: true } })

//module.exports.getBookmark = async (userId) => await prisma.bookmark.findMany({ where: { userId }, include: { restaurant: true } })

//========TIN======
module.exports.createBookmark = async ({ userId, restaurantId }) => await prisma.bookmark.create({ data: { userId, restaurantId } })
module.exports.getBookmark = async ({ userId, restaurantId }) => await prisma.bookmark.findFirst({ where: { userId, restaurantId } })
module.exports.deleteBookmark = async (id) => await prisma.bookmark.delete({ where: { id } })
