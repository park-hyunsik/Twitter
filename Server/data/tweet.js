import express from 'express';
import * as userRepository from './auth.js';
let tweets = [
    {
        id: '1',
        text: '첫 트윗입니다!!',
        createdAT: Date.now().toString(),
        userId: '1'
    },
    {
        id: '2',
        text: '안녕하세요요!!',
        createdAT: Date.now().toString(),
        userId: '1'
    },
    {
        id: '3',
        text: '싱싱한 메론!!',
        createdAT: Date.now().toString(),
        userId: '1'
    }
];
export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await userRepository.findById(tweet.userId);
            return { ...tweet, username, name, url };
        })
    )
}
export async function getAllbyUsername(username) {
    return getAll()
        .then((tweets => tweets.filter((tweet) => tweet.username === username)));
}
export async function getTweetsById(id) {
    const found = tweets.findIndex((tweet) => tweet.id === id)
    if (!found) {
        return null
    }
    const { username, name, url } = await userRepository.findbyId(found.userId);
    return { ...found, username, name, url };
}
export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAT: new Date(),
        userId
    };
    tweets = [tweet, ...tweets];
    return getTweetsById(tweet.id)
}
export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet
}
export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
