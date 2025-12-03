'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'swapNodes' function below.
 * The function is expected to return a 2D_INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY indexes
 *  2. INTEGER_ARRAY queries
 */

interface Node {
    val: number;
    left: Node | null;
    right: Node | null;
    depth: number;
}

function swapNodes(indexes: number[][], queries: number[]): number[][] {
    // Build the binary tree using BFS
    const root: Node = { val: 1, left: null, right: null, depth: 1 };
    const queue: Node[] = [root];
    let i = 0;

    while (i < indexes.length) {
        const current = queue.shift()!;
        const [l, r] = indexes[i++];

        if (l !== -1) {
            current.left = { val: l, left: null, right: null, depth: current.depth + 1 };
            queue.push(current.left);
        }
        if (r !== -1) {
            current.right = { val: r, left: null, right: null, depth: current.depth + 1 };
            queue.push(current.right);
        }
    }

    const result: number[][] = [];
    
    for (const k of queries) {
        swapAtDepth(root, k);
        const traversal: number[] = [];
        inorder(root, traversal);
        result.push(traversal);
    }

    return result;
}

function swapAtDepth(node: Node | null, k: number): void {
    if (!node) return;
    if (node.depth % k === 0) {
        [node.left, node.right] = [node.right, node.left];
    }
    swapAtDepth(node.left, k);
    swapAtDepth(node.right, k);
}

function inorder(node: Node | null, result: number[]): void {
    if (!node) return;
    inorder(node.left, result);
    result.push(node.val);
    inorder(node.right, result);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);
    let indexes: number[][] = Array(n);

    for (let i = 0; i < n; i++) {
        indexes[i] = readLine().trim().split(' ').map(Number);
    }

    const queriesCount: number = parseInt(readLine().trim(), 10);
    const queries: number[] = [];

    for (let i = 0; i < queriesCount; i++) {
        queries.push(parseInt(readLine().trim(), 10));
    }

    const result: number[][] = swapNodes(indexes, queries);
    ws.write(result.map(x => x.join(' ')).join('\n') + '\n');
    ws.end();
}
