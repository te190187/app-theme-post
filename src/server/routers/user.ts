import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { findManyThemes } from "../models/theme";
import { prisma } from "../prismadb";
import { publicProcedure, router } from "../trpc";

export const userRoute = router({
  //すべてのテーマからthemeのidがユーザidのthemeを取り出す
  getPostTheme: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const postThemes = await findManyThemes({
        where: { userId: input.userId },
      });
      return postThemes;
    }),

  getJoinTheme: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      //
      const joinTheme = await prisma.appThemeDeveloper.findMany({
        where: { userId: input.userId },
      });
      const joinThemeList = joinTheme.map((theme) => theme.appThemeId);
      const joinPostedTheme = await findManyThemes({
        where: { id: { in: joinThemeList } },
      });

      return joinPostedTheme;
    }),

  /** 指定されたユーザがいいねしたお題を取得する */
  getLikeTheme: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      //お題にいいねしてあるモデルの中から自分のIDを取得
      const likeThemeIds = await prisma.appThemeLike.findMany({
        select: { appThemeId: true },
        where: { userId: input.userId },
      });
      const likeThemeList = likeThemeIds.map((like) => like.appThemeId);
      const likePostedTheme = await findManyThemes({
        where: { id: { in: likeThemeList } },
      });
      return likePostedTheme;
    }),

  /** 指定されたユーザーが投稿したお題についた「いいね」をすべて取得する */
  getThemeLike: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      //whereで条件に一致するidを取得
      const postThemeIds = await prisma.appTheme.findMany({
        select: { id: true },
        where: { userId: input.userId },
      });
      const ids = postThemeIds.map((like) => like.id);
      const likes = await prisma.appThemeLike.count({
        where: { appThemeId: { in: ids } },
      });
      return likes;
    }),

  getThemeDeveloperLike: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const postThemeIds = await prisma.appThemeDeveloper.findMany({
        select: { id: true },
        where: { userId: input.userId },
      });
      const ids = postThemeIds.map((like) => like.id);
      const likes = await prisma.appThemeDeveloperLike.count({
        where: { developerId: { in: ids } },
      });
      return likes;
    }),

  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      console.log(input);
      const user = await prisma.user.findFirst({ where: { id: input.userId } });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      console.log(user);
      return user;
    }),
});
