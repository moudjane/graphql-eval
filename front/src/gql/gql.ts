/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": typeof types.MeDocument,
    "\n  query GetPosts($filter: PostFilterInput) {\n    getPosts(filter: $filter) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      likes\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  mutation LikePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n": typeof types.LikePostDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n    }\n  }\n": typeof types.CreatePostDocument,
    "\n  mutation Login($input: AuthInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  query GetUserPosts ($authorId: String!) {\n    getPosts(filter: { author: $authorId }) {\n      id\n      title\n      createdAt\n      authorId\n      content\n      likes\n    }\n  }\n": typeof types.GetUserPostsDocument,
    "\n  mutation UpdatePost($postId: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $postId, input: $input) {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n": typeof types.UpdatePostDocument,
    "\n  mutation DeletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n": typeof types.DeletePostDocument,
    "\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      comments{\n        content\n        id\n      }\n      likes\n    }\n  }\n": typeof types.GetPostDocument,
    "\n  mutation AddComment($postId: ID!, $content: String!) {\n    addComment(postId: $postId, content: $content) {\n      id\n    }\n  }\n": typeof types.AddCommentDocument,
    "\n  mutation Register($input: AuthInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n": typeof types.RegisterDocument,
};
const documents: Documents = {
    "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n": types.MeDocument,
    "\n  query GetPosts($filter: PostFilterInput) {\n    getPosts(filter: $filter) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      likes\n    }\n  }\n": types.GetPostsDocument,
    "\n  mutation LikePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n": types.LikePostDocument,
    "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation Login($input: AuthInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query GetUserPosts ($authorId: String!) {\n    getPosts(filter: { author: $authorId }) {\n      id\n      title\n      createdAt\n      authorId\n      content\n      likes\n    }\n  }\n": types.GetUserPostsDocument,
    "\n  mutation UpdatePost($postId: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $postId, input: $input) {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n": types.UpdatePostDocument,
    "\n  mutation DeletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n": types.DeletePostDocument,
    "\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      comments{\n        content\n        id\n      }\n      likes\n    }\n  }\n": types.GetPostDocument,
    "\n  mutation AddComment($postId: ID!, $content: String!) {\n    addComment(postId: $postId, content: $content) {\n      id\n    }\n  }\n": types.AddCommentDocument,
    "\n  mutation Register($input: AuthInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n": types.RegisterDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts($filter: PostFilterInput) {\n    getPosts(filter: $filter) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      likes\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($filter: PostFilterInput) {\n    getPosts(filter: $filter) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      likes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LikePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation LikePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($input: CreatePostInput!) {\n    createPost(input: $input) {\n      id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: AuthInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: AuthInput!) {\n    login(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserPosts ($authorId: String!) {\n    getPosts(filter: { author: $authorId }) {\n      id\n      title\n      createdAt\n      authorId\n      content\n      likes\n    }\n  }\n"): (typeof documents)["\n  query GetUserPosts ($authorId: String!) {\n    getPosts(filter: { author: $authorId }) {\n      id\n      title\n      createdAt\n      authorId\n      content\n      likes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePost($postId: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $postId, input: $input) {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePost($postId: ID!, $input: UpdatePostInput!) {\n    updatePost(id: $postId, input: $input) {\n      id\n      title\n      content\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n"): (typeof documents)["\n  mutation DeletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      comments{\n        content\n        id\n      }\n      likes\n    }\n  }\n"): (typeof documents)["\n  query GetPost($id: ID!) {\n    getPost(id: $id) {\n      id\n      title\n      createdAt\n      authorId\n      authorName\n      content\n      comments{\n        content\n        id\n      }\n      likes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddComment($postId: ID!, $content: String!) {\n    addComment(postId: $postId, content: $content) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddComment($postId: ID!, $content: String!) {\n    addComment(postId: $postId, content: $content) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: AuthInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: AuthInput!) {\n    register(input: $input) {\n      token\n      user {\n        id\n        username\n        email\n        posts\n        comments\n        createdAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;