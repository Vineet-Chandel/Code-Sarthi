export default {
  topics: [
    {
      id: "basics",
      title: "Basics & Methods",
      sections: [
        {
          heading: "Variables & types",
          description: "Ruby is dynamically typed. Variables need no declaration — just assign.",
          language: "ruby",
          code: `# Variables
name    = "Vineet"         # String
age     = 28               # Integer
height  = 5.11             # Float
active  = true             # Boolean
nothing = nil              # Null equivalent

# Symbols — immutable, interned strings (great for hash keys)
status = :active

# String interpolation
puts "Hello, #{name}! Age: #{age}"

# Multi-line string
text = <<~HEREDOC
  Line one
  Line two
HEREDOC`,
        },
        {
          heading: "Methods",
          description: "def defines methods. ? convention signals a boolean return; ! convention signals mutation.",
          language: "ruby",
          code: `# Basic method
def greet(name, greeting: "Hello")
  "#{greeting}, #{name}!"
end

puts greet("Vineet")                   # "Hello, Vineet!"
puts greet("Vineet", greeting: "Hi")   # "Hi, Vineet!"

# Predicate method (returns boolean)
def admin?(user)
  user[:role] == "admin"
end

# Bang method (mutates in place)
words = ["hello", "world"]
words.map!(&:upcase)   # ["HELLO", "WORLD"]

# Method with block
def repeat(n)
  n.times { yield }
end
repeat(3) { print "Go! " }   # Go! Go! Go!`,
        },
      ],
    },
    {
      id: "collections",
      title: "Collections",
      sections: [
        {
          heading: "Arrays",
          description: "Ruby arrays are dynamic, heterogeneous, and come with a rich Enumerable API.",
          language: "ruby",
          code: `arr = [1, 2, 3, 4, 5]

arr.push(6)              # append — [1..6]
arr.unshift(0)           # prepend — [0..6]
arr.pop                  # remove last
arr.shift                # remove first

arr.map  { |x| x * 2 }  # [0, 2, 4, 6, 8, 10]
arr.select { |x| x.even? }  # [0, 2, 4, 6, 10]
arr.reject { |x| x.odd?  }  # same
arr.reduce(0) { |sum, x| sum + x }  # sum

arr.each_with_index { |val, i| puts "#{i}: #{val}" }
arr.flatten           # nested → flat
arr.compact           # remove nils
arr.uniq              # remove duplicates`,
        },
        {
          heading: "Hashes",
          description: "Hashes are Ruby's key-value store. Symbol keys are idiomatic for static keys.",
          language: "ruby",
          code: `# Create
user = { name: "Vineet", age: 28, role: :admin }

# Access
user[:name]                    # "Vineet"
user.fetch(:email, "unknown")  # "unknown" (safe default)

# Modify
user[:email] = "v@devcheats.in"
user.delete(:age)

# Iteration
user.each { |key, val| puts "#{key}: #{val}" }
user.map  { |k, v| "#{k}=#{v}" }.join("&")
user.select { |_, v| v.is_a?(String) }
user.transform_values(&:to_s)`,
        },
        {
          heading: "Ranges",
          description: "Ranges represent a sequence from start to end. .. is inclusive; ... excludes the end.",
          language: "ruby",
          code: `(1..5).to_a          # [1, 2, 3, 4, 5]
(1...5).to_a         # [1, 2, 3, 4]

(1..100).sum         # 5050
('a'..'e').to_a      # ["a", "b", "c", "d", "e"]

# Check membership
(1..10).include?(7)  # true

# Iteration
(1..5).each { |n| print "#{n} " }

# Step
(0..1.0).step(0.25).to_a  # [0.0, 0.25, 0.5, 0.75, 1.0]`,
        },
      ],
    },
    {
      id: "classes-modules",
      title: "Classes & Modules",
      sections: [
        {
          heading: "Class definition",
          description: "attr_accessor generates getter+setter; attr_reader getter-only; attr_writer setter-only.",
          language: "ruby",
          code: `class User
  attr_accessor :name, :email
  attr_reader   :id

  @@count = 0   # class variable

  def initialize(id, name, email)
    @id    = id       # instance variable
    @name  = name
    @email = email
    @@count += 1
  end

  def self.count = @@count    # class method

  def to_s = "User(#{@id}, #{@name})"
end

u = User.new(1, "Vineet", "v@x.com")
puts u.name         # "Vineet"
puts User.count     # 1`,
        },
        {
          heading: "Modules & mixins",
          description: "Modules can't be instantiated but can be mixed into classes with include or extend.",
          language: "ruby",
          code: `module Greetable
  def greet
    "Hello, I'm #{name}"
  end
end

module Serializable
  def to_json
    instance_variables.each_with_object({}) do |var, h|
      h[var.to_s.delete("@")] = instance_variable_get(var)
    end.to_json
  end
end

class User
  include Greetable     # adds instance methods
  include Serializable

  attr_reader :name
  def initialize(name) = @name = name
end

puts User.new("Vineet").greet  # "Hello, I'm Vineet"`,
        },
      ],
    },
    {
      id: "blocks-procs",
      title: "Blocks, Procs & Lambdas",
      sections: [
        {
          heading: "Blocks",
          description: "Blocks are anonymous chunks of code passed to methods. yield executes the block.",
          language: "ruby",
          code: `# Explicit block parameter with &
def measure(&block)
  start = Time.now
  result = block.call
  puts "Elapsed: #{Time.now - start}s"
  result
end

measure { sleep 0.1 }

# block_given? — check if a block was provided
def maybe_yield
  yield if block_given?
end`,
        },
        {
          heading: "Procs & Lambdas",
          description: "Proc.new and proc {} are loose; lambda {} enforces arity and returns locally.",
          language: "ruby",
          code: `# Proc
double = Proc.new { |x| x * 2 }
double.call(5)   # 10
double.(5)       # shorthand

# Lambda (strict arity, local return)
square = lambda { |x| x ** 2 }
cube   = ->(x) { x ** 3 }     # stabby lambda

[1, 2, 3].map(&square)  # [1, 4, 9]
[1, 2, 3].map(&method(:puts))  # converts method to proc`,
        },
      ],
    },
  ],
};
