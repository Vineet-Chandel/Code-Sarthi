export default {
  topics: [
    {
      id: "matrices",
      title: "Matrices & Arrays",
      sections: [
        {
          heading: "Creating arrays & matrices",
          description: "MATLAB is 1-indexed. Everything is a matrix — scalars are 1×1, vectors are 1×N or N×1.",
          language: "matlab",
          code: `% Row vector (1×5)
v = [1, 2, 3, 4, 5];

% Column vector (5×1)
c = [1; 2; 3; 4; 5];

% Matrix (3×3)
A = [1 2 3; 4 5 6; 7 8 9];

% Built-in generators
z = zeros(3, 3);          % 3×3 of zeros
o = ones(2, 4);           % 2×4 of ones
r = rand(3);              % 3×3 random [0,1]
I = eye(4);               % 4×4 identity
L = linspace(0, 1, 11);  % 11 evenly-spaced points from 0 to 1
R = 1:2:10;               % [1 3 5 7 9] — start:step:end`,
        },
        {
          heading: "Indexing & slicing",
          description: "MATLAB uses () for indexing (not []). end refers to the last index.",
          language: "matlab",
          code: `A = magic(4);          % 4×4 magic square

A(2, 3)                % element at row 2, col 3
A(1, :)                % first row (all columns)
A(:, 2)                % second column (all rows)
A(1:2, 2:4)            % submatrix rows 1-2, cols 2-4
A(end, :)              % last row
A(end-1:end, :)        % last two rows

% Linear indexing
A(5)                   % 5th element in column-major order

% Logical indexing
A(A > 10)              % all elements > 10`,
        },
        {
          heading: "Matrix operations",
          description: "* is matrix multiplication; .* is element-wise. Prefix . for element-wise on most operators.",
          language: "matlab",
          code: `A = [1 2; 3 4];
B = [5 6; 7 8];

A + B                  % element-wise addition
A * B                  % matrix multiplication
A .* B                 % element-wise multiplication
A ^ 2                  % matrix power (A*A)
A .^ 2                 % element-wise power

A'                     % transpose
inv(A)                 % inverse
det(A)                 % determinant
A \\ B                  % solve Ax=B (left division)
rank(A)                % matrix rank
eig(A)                 % eigenvalues`,
        },
      ],
    },
    {
      id: "control-flow",
      title: "Control Flow",
      sections: [
        {
          heading: "Conditionals & loops",
          description: "MATLAB control structures look like Python/Ruby with end terminators.",
          language: "matlab",
          code: `% If / elseif / else
x = 42;
if x > 100
    disp('Large')
elseif x > 10
    disp('Medium')
else
    disp('Small')
end

% For loop
for i = 1:5
    fprintf('i = %d\\n', i);
end

% While loop
n = 1;
while n < 100
    n = n * 2;
end

% Break and continue
for k = 1:10
    if mod(k, 2) == 0, continue; end
    if k > 7, break; end
    disp(k)
end`,
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      sections: [
        {
          heading: "Defining functions",
          description: "Functions live in .m files with the same name, or as local functions at the bottom of a script.",
          language: "matlab",
          code: `% functions/stats.m
function [mn, sd] = stats(data)
%STATS Compute mean and standard deviation
    mn = mean(data);
    sd = std(data);
end

% Calling
[m, s] = stats([4, 7, 2, 9, 1]);
fprintf('Mean: %.2f, Std: %.2f\\n', m, s);

% Anonymous function (lambda)
sq = @(x) x.^2;
sq([1 2 3 4])  % [1 4 9 16]

% Nested anonymous functions
add = @(a) @(b) a + b;
add5 = add(5);
add5(3)  % 8`,
        },
        {
          heading: "Vectorisation over loops",
          description: "Vectorised code is dramatically faster in MATLAB — avoid loops when possible.",
          language: "matlab",
          code: `n = 1e6;
x = rand(1, n);

% SLOW — explicit loop
tic
total = 0;
for i = 1:n
    total = total + x(i)^2;
end
toc

% FAST — vectorised
tic
total_v = sum(x .^ 2);
toc

% Vectorised operations
y = sin(x) .* exp(-x);        % element-wise
z = cumsum(x);                 % cumulative sum
idx = find(x > 0.9);          % indices where condition holds`,
        },
      ],
    },
    {
      id: "plotting",
      title: "Plotting",
      sections: [
        {
          heading: "2D plots",
          description: "plot() is the workhorse. Always label your axes.",
          language: "matlab",
          code: `x = linspace(0, 2*pi, 200);
y = sin(x);
z = cos(x);

figure;
plot(x, y, 'b-', 'LineWidth', 2);    % blue solid line
hold on
plot(x, z, 'r--', 'LineWidth', 1.5); % red dashed
hold off

xlabel('x (radians)');
ylabel('Amplitude');
title('Sine and Cosine');
legend('sin(x)', 'cos(x)');
grid on
xlim([0, 2*pi]);`,
        },
      ],
    },
  ],
};
